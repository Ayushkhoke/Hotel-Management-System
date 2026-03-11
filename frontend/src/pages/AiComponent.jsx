import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { askAIReceptionist } from "../services/aiApi";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiconnector";
import { room, booking } from "../services/apis";
import { bookRoom } from "../services/roombookingApi";
import { buyPayment } from "../services/paymentapi/RoompaymentApi";
import { getAvailableRooms } from "../services/roomApi";
import { getAvailableMenus } from "../services/menuApi";
import { placeOrder } from "../services/orderApi";
import { buyOrder } from "../services/customerPayment";
import { getAvailableTables } from "../services/tableApi";
import { bookTable } from "../services/tablebookingApi";
import { buyTablePayment } from "../services/paymentapi/TablepaymentApi";

function formatDateForApi(dateValue) {
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return null;
  
  // Use local date components to avoid timezone issues
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

function parseDateInput(value) {
  if (!value) return null;

  const raw = String(value).trim();
  const normalized = raw
    .toLowerCase()
    .replace(/(\d{1,2})(st|nd|rd|th)\b/g, "$1")
    .replace(/,/g, " ")
    .replace(/:/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parsed = new Date(normalized);
  if (!Number.isNaN(parsed.getTime())) {
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  }

  const monthMap = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
  };

  function normalizeYear(y) {
    const yearNum = Number(y);
    if (!Number.isFinite(yearNum)) return null;
    return yearNum < 100 ? 2000 + yearNum : yearNum;
  }

  function buildValidDate(year, monthIndex, day) {
    const d = new Date(year, monthIndex, day);
    if (
      Number.isNaN(d.getTime()) ||
      d.getFullYear() !== year ||
      d.getMonth() !== monthIndex ||
      d.getDate() !== day
    ) {
      return null;
    }

    d.setHours(0, 0, 0, 0);
    return d;
  }

  const numeric = normalized.match(/^(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?$/);
  if (numeric) {
    const day = Number(numeric[1]);
    const monthIndex = Number(numeric[2]) - 1;
    const year = numeric[3] ? normalizeYear(numeric[3]) : new Date().getFullYear();
    if (year === null) return null;
    return buildValidDate(year, monthIndex, day);
  }

  const dayMonthNameYear = normalized.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{2,4})$/);
  if (dayMonthNameYear) {
    const day = Number(dayMonthNameYear[1]);
    const monthIndex = monthMap[dayMonthNameYear[2]];
    const year = normalizeYear(dayMonthNameYear[3]);
    if (monthIndex === undefined || year === null) return null;
    return buildValidDate(year, monthIndex, day);
  }

  const monthNameDayYear = normalized.match(/^([a-z]+)\s+(\d{1,2})\s+(\d{2,4})$/);
  if (monthNameDayYear) {
    const monthIndex = monthMap[monthNameDayYear[1]];
    const day = Number(monthNameDayYear[2]);
    const year = normalizeYear(monthNameDayYear[3]);
    if (monthIndex === undefined || year === null) return null;
    return buildValidDate(year, monthIndex, day);
  }

  const monthNameDayOnly = normalized.match(/^([a-z]+)\s+(\d{1,2})$/);
  if (monthNameDayOnly) {
    const monthIndex = monthMap[monthNameDayOnly[1]];
    const day = Number(monthNameDayOnly[2]);
    const year = new Date().getFullYear();
    if (monthIndex === undefined) return null;
    return buildValidDate(year, monthIndex, day);
  }

  return null;
}

function parseTimeSlot(value) {
  if (!value) return null;

  const text = String(value).toLowerCase().trim();

  // Check for specific time slots
  if (text.includes("morning") || text.includes("breakfast")) {
    return "morning";
  }
  if (text.includes("afternoon") || text.includes("lunch")) {
    return "afternoon";
  }
  if (text.includes("evening") || text.includes("dinner")) {
    return "evening";
  }
  if (text.includes("night") || text.includes("late")) {
    return "night";
  }

  // Check for time ranges
  const hourMatch = text.match(/(\d{1,2})\s*(am|pm)?/);
  if (hourMatch) {
    const hour = Number(hourMatch[1]);
    const isPM = hourMatch[2] === "pm";
    const hour24 = isPM && hour < 12 ? hour + 12 : hour;

    if (hour24 >= 6 && hour24 < 12) return "morning";
    if (hour24 >= 12 && hour24 < 17) return "afternoon";
    if (hour24 >= 17 && hour24 < 21) return "evening";
    if (hour24 >= 21 || hour24 < 6) return "night";
  }

  return null;
}

function getNights(checkIn, checkOut) {
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function parsePriceRange(input) {
  const normalized = String(input || "")
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/usd|\$|dollars?/g, "")
    .trim();

  if (!normalized || /any|no budget|anything|dont care|doesn'?t matter/.test(normalized)) {
    return { min: 0, max: Number.POSITIVE_INFINITY, label: "Any budget" };
  }

  const numbers = normalized.match(/\d+/g)?.map(Number) || [];
  if (!numbers.length) return null;

  if (/between|to|\-|and/.test(normalized) && numbers.length >= 2) {
    const min = Math.min(numbers[0], numbers[1]);
    const max = Math.max(numbers[0], numbers[1]);
    return { min, max, label: `$ ${min} to $ ${max}` };
  }

  if (/under|below|max|less/.test(normalized)) {
    return { min: 0, max: numbers[0], label: `Up to $ ${numbers[0]}` };
  }

  if (/above|over|min|more/.test(normalized)) {
    return {
      min: numbers[0],
      max: Number.POSITIVE_INFINITY,
      label: `$ ${numbers[0]} and above`,
    };
  }

  return { min: 0, max: numbers[0], label: `Up to $ ${numbers[0]}` };
}

function parseRoomType(input) {
  const normalized = String(input || "").toLowerCase().trim();
  if (!normalized) return null;
  if (/any|suggest|no preference|doesn'?t matter/.test(normalized)) {
    return { value: "any", label: "Any room type" };
  }
  if (normalized.includes("single")) return { value: "Single", label: "Single" };
  if (normalized.includes("double")) return { value: "Double", label: "Double" };
  if (normalized.includes("deluxe")) return { value: "Deluxe", label: "Deluxe" };
  if (normalized.includes("suite")) return { value: "Suite", label: "Suite" };
  return null;
}

function parseGuestCount(input) {
  const normalized = String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return null;

  const numeric = Number(normalized.match(/\d+/)?.[0]);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;

  if (/\b(a|an)\s+(guest|guests|person|people)\b/.test(normalized)) {
    return 1;
  }

  const ones = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  };

  const tens = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  const ignore = new Set(["and", "guest", "guests", "person", "people", "persons"]);
  const tokens = normalized.split(" ");

  let total = 0;
  let current = 0;
  let found = false;

  for (const token of tokens) {
    if (ignore.has(token)) continue;

    if (Object.prototype.hasOwnProperty.call(ones, token)) {
      current += ones[token];
      found = true;
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(tens, token)) {
      current += tens[token];
      found = true;
      continue;
    }

    if (token === "hundred" && current > 0) {
      current *= 100;
      found = true;
      continue;
    }

    if (token === "thousand" && current > 0) {
      total += current * 1000;
      current = 0;
      found = true;
      continue;
    }

    if (found) break;
  }

  const value = total + current;
  return found && value > 0 ? value : null;
}

export default function AIChat() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "ai",
      text: "Hello. I am your AI receptionist. Ask about rooms, rates, availability, restaurant menu, or table reservations.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speakerSupported, setSpeakerSupported] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [bookingFlow, setBookingFlow] = useState({
    active: false,
    step: "idle",
    data: {
      checkIn: "",
      checkOut: "",
      guests: "",
      priceRange: null,
      roomType: null,
    },
    options: [],
    selectedRoom: null,
    pendingPaymentBooking: null,
  });
  const [orderFlow, setOrderFlow] = useState({
    active: false,
    step: "idle",
    selectedMenuItem: null,
    quantity: 0,
    pendingOrder: null,
  });
  const [tableBookingFlow, setTableBookingFlow] = useState({
    active: false,
    step: "idle",
    data: {
      date: "",
      timeSlot: "",
      guests: "",
      budget: null,
    },
    options: [],
    selectedTable: null,
  });
  const [rooms, setRooms] = useState([]);
  const [fetchingRooms, setFetchingRooms] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatRef = useRef(chat);
  const loadingRef = useRef(false);
  const voiceEnabledRef = useRef(voiceEnabled);
  const bookingFlowRef = useRef(bookingFlow);
  const orderFlowRef = useRef(orderFlow);
  const tableBookingFlowRef = useRef(tableBookingFlow);
  const roomsRef = useRef(rooms);
  const hasAutoGreetedRef = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    bookingFlowRef.current = bookingFlow;
  }, [bookingFlow]);

  useEffect(() => {
    orderFlowRef.current = orderFlow;
  }, [orderFlow]);

  useEffect(() => {
    tableBookingFlowRef.current = tableBookingFlow;
  }, [tableBookingFlow]);

  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);

  async function fetchRooms() {
    if (!token) return [];

    try {
      setFetchingRooms(true);
      const response = await apiConnector("GET", room.GET_ROOM_API, null, {
        Authorization: `Bearer ${token}`,
      });

      const list = response?.data?.rooms || [];
      setRooms(list);
      roomsRef.current = list;
      return list;
    } catch (error) {
      return [];
    } finally {
      setFetchingRooms(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, [token]);

  useEffect(() => {
    const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    setSpeakerSupported(Boolean(canSpeak));
    setMicSupported(Boolean(SpeechRecognition));

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      setIsListening(false);

      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        appendAIMessage("Microphone permission is blocked. Please allow microphone access and try again.");
      }
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim();
      if (!transcript) return;
      setMessage(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current = null;
      }
    };
  }, []);

  function speakReply(text) {
    if (!voiceEnabledRef.current || !text) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function appendAIMessage(text, payload = {}) {
    const nextChat = [...chatRef.current, { role: "ai", text, ...payload }];
    chatRef.current = nextChat;
    setChat(nextChat);
    speakReply(text);
  }

  function startBookingFlow() {
    setBookingFlow({
      active: true,
      step: "checkIn",
      data: {
        checkIn: "",
        checkOut: "",
        guests: "",
        priceRange: null,
        roomType: null,
      },
      options: [],
      selectedRoom: null,
      pendingPaymentBooking: null,
    });
    appendAIMessage("Wonderful! Let me help you book a hotel room. What is your check-in date?");
  }

  function shouldStartBookingFlow(input) {
    const text = String(input || "").toLowerCase();
    
    // Exclude table/restaurant booking from room booking flow
    if (/table|restaurant|dining/.test(text)) {
      return false;
    }
    
    // Check for room booking keywords
    return /room.*book|book.*room|stay|accommodation|check.?in|reserve.*room/.test(text) ||
           (/book|booking|reserve|reservation/.test(text) && !/table|restaurant|dining/.test(text));
  }

  function shouldStartTableBooking(input) {
    const text = String(input || "").toLowerCase();
    return (
      text.includes("table") && (text.includes("book") || text.includes("reserve") || text.includes("reservation")) ||
      (text.includes("restaurant") && (text.includes("book") || text.includes("reserve"))) ||
      text.includes("dining reservation") ||
      text.includes("table booking")
    );
  }

  function startTableBookingFlow() {
    setTableBookingFlow({
      active: true,
      step: "date",
      data: { date: "", timeSlot: "", guests: "", budget: null },
      options: [],
      selectedTable: null,
    });

    appendAIMessage(
      "Great! Let's book a table at our restaurant. What date would you like to dine with us? (e.g., March 15, 2026 or 15/03/2026)"
    );
  }

  async function continueTableBookingFlow(inputText) {
    const flow = tableBookingFlowRef.current;
    const nextData = { ...flow.data };

    if (flow.step === "date") {
      const parsedDate = parseDateInput(inputText);
      console.log("Date input:", inputText, "Parsed:", parsedDate);
      
      if (!parsedDate) {
        appendAIMessage("Please provide a valid date, for example: March 15, 2026 or 15/03/2026");
        return true;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (parsedDate < today) {
        appendAIMessage("Please choose a date from today onwards.");
        return true;
      }

      const formattedDate = formatDateForApi(parsedDate);
      console.log("Formatted date for API:", formattedDate);
      
      nextData.date = formattedDate;
      setTableBookingFlow((prev) => ({ ...prev, step: "timeSlot", data: nextData }));
      appendAIMessage(
        "Perfect! What time would you prefer? (Options: morning, afternoon, evening, or night)"
      );
      return true;
    }

    if (flow.step === "timeSlot") {
      const timeSlot = parseTimeSlot(inputText);
      if (!timeSlot) {
        appendAIMessage(
          "Please choose a valid time: morning, afternoon, evening, or night"
        );
        return true;
      }

      nextData.timeSlot = timeSlot;
      setTableBookingFlow((prev) => ({ ...prev, step: "guests", data: nextData }));
      appendAIMessage("How many guests will be dining?");
      return true;
    }

    if (flow.step === "guests") {
      const guests = parseGuestCount(inputText);
      if (!guests || guests < 1) {
        appendAIMessage("Please enter a valid number of guests.");
        return true;
      }

      nextData.guests = guests;
      setTableBookingFlow((prev) => ({ ...prev, step: "budget", data: nextData }));
      appendAIMessage(
        "What's your budget per person for dining? (e.g., 'under 50', 'between 30 and 80', or 'any budget')"
      );
      return true;
    }

    if (flow.step === "budget") {
      const budget = parsePriceRange(inputText);
      if (!budget) {
        appendAIMessage(
          "Please share your budget, for example: 'under 50', 'between 30 and 80', or 'any budget'"
        );
        return true;
      }

      nextData.budget = budget;

      try {
        loadingRef.current = true;
        setLoading(true);

        // Fetch available tables
        const availableTableList = await getAvailableTables(
          nextData.date,
          nextData.timeSlot,
          token
        );

        // Filter by capacity and price
        const tablesWithCapacity = (availableTableList || [])
          .filter((tableItem) => Number(tableItem.capacity || 0) >= Number(nextData.guests));
        
        // Filter out tables without price
        const tablesWithPrice = tablesWithCapacity.filter((tableItem) => 
          tableItem.price && Number(tableItem.price) > 0
        );

        if (tablesWithPrice.length === 0 && tablesWithCapacity.length > 0) {
          setTableBookingFlow((prev) => ({ ...prev, step: "date", data: { date: "", timeSlot: "", guests: "", budget: null } }));
          appendAIMessage(
            `Sorry, tables are not yet configured with pricing. Please contact our staff directly to complete your reservation.`
          );
          loadingRef.current = false;
          setLoading(false);
          return true;
        }

        // Filter by budget
        const options = tablesWithPrice
          .filter((tableItem) => {
            const price = Number(tableItem.price);
            const min = Number(nextData.budget?.min || 0);
            const max = Number.isFinite(nextData.budget?.max)
              ? Number(nextData.budget?.max)
              : Number.POSITIVE_INFINITY;
            return price >= min && price <= max;
          })
          .sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
          .slice(0, 6);

        if (!options.length) {
          setTableBookingFlow((prev) => ({ ...prev, step: "budget", data: nextData }));
          appendAIMessage(
            `Sorry, no tables are available for ${nextData.guests} guests on ${nextData.date} during ${nextData.timeSlot} within your budget (${nextData.budget.label}). Please try a different budget or date.`
          );
          loadingRef.current = false;
          setLoading(false);
          return true;
        }

        setTableBookingFlow((prev) => ({
          ...prev,
          step: "selectTable",
          data: nextData,
          options,
        }));

        appendAIMessage(
          `Perfect! Here are the available tables for ${nextData.guests} guests on ${nextData.date} during ${nextData.timeSlot} within your budget (${nextData.budget.label}). Please select a table:`,
          {
            kind: "table-options",
            options: options,
            flowData: nextData,
          }
        );

        loadingRef.current = false;
        setLoading(false);
        return true;
      } catch (error) {
        appendAIMessage("Sorry, I couldn't fetch available tables. Please try again.");
        loadingRef.current = false;
        setLoading(false);
        return true;
      }
    }

    if (flow.step === "selectTable") {
      console.log("User input for table selection:", inputText);
      console.log("Available options:", flow.options.map(t => ({ id: t._id, number: t.tableNumber })));
      
      const selectedTable = matchSelectedTableByText(inputText, flow.options);
      
      console.log("Matched table:", selectedTable);
      
      if (!selectedTable) {
        appendAIMessage("Please select a table from the options shown above by clicking on it or typing the table number.");
        return true;
      }

      await handleTableSelection(selectedTable, nextData);
      return true;
    }

    return false;
  }

  function matchSelectedTableByText(input, options) {
    const text = String(input || "").toLowerCase();
    
    // Try to extract option number first (e.g., "option 2" or just "2")
    const optionMatch = text.match(/option\s*(\d+)|\b(\d+)\b/);
    if (optionMatch) {
      const optionIndex = Number(optionMatch[1] || optionMatch[2]);
      if (optionIndex && options[optionIndex - 1]) {
        return options[optionIndex - 1];
      }
    }

    // Try to match by table number
    return options.find((tableItem) => {
      const tableNum = String(tableItem.tableNumber || "");
      const location = String(tableItem.location || "").toLowerCase();
      
      return (
        text.includes(`table ${tableNum}`.toLowerCase()) ||
        text.includes(`#${tableNum}`) ||
        text === tableNum ||
        (location && text.includes(location))
      );
    });
  }

  async function handleTableSelection(tableItem, flowData) {
    if (!token) {
      appendAIMessage("Please login first to continue with table booking.");
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);

      console.log("Table Selection Data:", {
        table_id: tableItem._id,
        date: flowData.date,
        timeSlot: flowData.timeSlot,
        guests: flowData.guests,
        tableDetails: tableItem
      });

      const bookingData = {
        table_id: tableItem._id,
        date: flowData.date,
        timeSlot: flowData.timeSlot,
        guests: flowData.guests,
      };

      const bookingResult = await dispatch(bookTable(bookingData, token));

      if (!bookingResult) {
        throw new Error("Table booking failed");
      }

      const totalAmount = Number(bookingResult.amount || 0);
      const locationText = tableItem.location ? ` at ${tableItem.location}` : "";

      setTableBookingFlow((prev) => ({
        ...prev,
        step: "payment",
        selectedTable: tableItem,
      }));

      appendAIMessage(
        `Perfect! Table #${tableItem.tableNumber}${locationText} is reserved for ${flowData.guests} guests on ${flowData.date} during ${flowData.timeSlot}. Total amount: $${totalAmount}. Click the button below to complete payment and confirm your reservation.`,
        {
          kind: "table-payment-action",
          booking: bookingResult,
          table: tableItem,
          flowData: flowData,
          totalAmount: totalAmount,
        }
      );
    } catch (error) {
      console.error("Table Booking Error:", error);
      const errorMessage = error?.message || "Failed to book the table. Please try again or contact our staff.";
      appendAIMessage(errorMessage);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  async function handleTablePayNow(bookingData) {
    if (!bookingData || !token) {
      appendAIMessage("Unable to start payment right now. Please try again.");
      return;
    }

    try {
      await buyTablePayment(token, user, bookingData, dispatch);
      appendAIMessage("Payment window opened. Please complete the payment there.");
      setTableBookingFlow({
        active: false,
        step: "idle",
        data: { date: "", timeSlot: "", guests: "", budget: null },
        options: [],
        selectedTable: null,
      });
    } catch (error) {
      appendAIMessage("Payment could not be started. Please try again.");
    }
  }

  function handleTableBookingRequest() {
    startTableBookingFlow();
  }

  function shouldShowMenu(input) {
    const text = String(input || "").toLowerCase();
    return (
      text.includes("menu") ||
      text.includes("food") ||
      text.includes("eat") ||
      text.includes("dining") ||
      text.includes("restaurant") ||
      text.includes("breakfast") ||
      text.includes("lunch") ||
      text.includes("dinner") ||
      text.includes("dish") ||
      text.includes("meal")
    );
  }

  async function showMenuItems() {
    try {
      loadingRef.current = true;
      setLoading(true);

      console.log("Fetching menu items with token:", token ? "Present" : "Missing");
      
      const menuItems = await getAvailableMenus(token);
      console.log("Menu items received:", menuItems?.length || 0);

      if (!menuItems || menuItems.length === 0) {
        appendAIMessage(
          "I apologize, but we don't have any menu items available at the moment. Our restaurant is currently updating the menu. Please contact our dining staff directly or check back later."
        );
        return;
      }

      appendAIMessage(
        "Here's our current menu with available dishes. You can order room service or visit our restaurant:",
        {
          kind: "menu-display",
          menuItems: menuItems,
        }
      );
    } catch (error) {
      console.error("Show menu error:", error);
      appendAIMessage("I'm having trouble fetching the menu right now. Please try again in a moment or contact our restaurant directly.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function matchSelectedRoomByText(input, options) {
    const text = String(input || "").toLowerCase();
    const optionIndex = Number(text.match(/\d+/)?.[0]);

    if (optionIndex && options[optionIndex - 1]) {
      return options[optionIndex - 1];
    }

    return options.find((roomItem) => {
      return (
        text.includes(String(roomItem.roomNumber || "").toLowerCase()) ||
        text.includes(String(roomItem.type || "").toLowerCase())
      );
    });
  }

  async function fetchBookingWithRoom(bookingId) {
    if (!token || !bookingId) return null;

    try {
      const response = await apiConnector("GET", booking.GET_MY_BOOKINGS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      const list = response?.data?.bookings || [];
      return list.find((item) => item._id === bookingId) || null;
    } catch (error) {
      return null;
    }
  }

  async function handleRoomSelection(roomItem, flowData) {
    if (!token) {
      appendAIMessage("Please login first to continue booking and payment.");
      return;
    }

    const nights = getNights(flowData.checkIn, flowData.checkOut);
    if (nights <= 0) {
      appendAIMessage("The selected dates are not valid. Please start again with your check-in date.");
      setBookingFlow((prev) => ({ ...prev, active: true, step: "checkIn" }));
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);

      const totalPrice = nights * Number(roomItem.pricePerNight || 0);
      const createdBooking = await bookRoom(
        {
          room: roomItem._id,
          checkIn: flowData.checkIn,
          checkOut: flowData.checkOut,
          totalPrice,
        },
        token
      );

      const bookingWithRoom = await fetchBookingWithRoom(createdBooking?._id);
      const paymentBooking = bookingWithRoom || {
        ...createdBooking,
        room: roomItem,
      };

      setBookingFlow((prev) => ({
        ...prev,
        active: true,
        step: "payment",
        selectedRoom: roomItem,
        pendingPaymentBooking: paymentBooking,
      }));

      appendAIMessage(
        `Great choice. Your ${roomItem.type} room is booked for ${nights} night(s). Total is $ ${totalPrice}. Click Pay Now to complete payment.`,
        {
          kind: "payment-action",
          booking: paymentBooking,
        }
      );
    } catch (error) {
      appendAIMessage(error?.message || "Booking failed. Please try another room option.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  async function handlePayNow(singleBooking) {
    if (!singleBooking || !token) {
      appendAIMessage("Unable to start payment right now. Please try again.");
      return;
    }

    try {
      await buyPayment(token, user, singleBooking, dispatch);
      appendAIMessage("Payment window opened. Please complete the payment there.");
      setBookingFlow((prev) => ({
        ...prev,
        active: false,
        step: "idle",
      }));
    } catch (error) {
      appendAIMessage("Payment could not be started. Please try Pay Now again.");
    }
  }

  // MENU ORDERING FUNCTIONS
  function handleMenuItemClick(menuItem) {
    if (!token) {
      appendAIMessage("Please login first to place an order.");
      return;
    }

    setOrderFlow({
      active: true,
      step: "askQuantity",
      selectedMenuItem: menuItem,
      quantity: 0,
      pendingOrder: null,
    });

    appendAIMessage(
      `${menuItem.name} added to cart. It costs $${menuItem.price} per plate. How many plates would you like to order?`
    );
  }

  async function handleOrderQuantityResponse(inputText) {
    const flow = orderFlowRef.current;
    const quantity = Number(String(inputText || "").match(/\d+/)?.[0]);

    if (!quantity || quantity < 1) {
      appendAIMessage("Please enter a valid quantity (e.g., 1, 2, 3...)");
      return;
    }

    if (quantity > 20) {
      appendAIMessage("For large orders (more than 20 plates), please contact our restaurant directly.");
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);

      const computedTotalAmount = Number(flow.selectedMenuItem.price) * quantity;
      
      const orderData = {
        items: [
          {
            menuItem: flow.selectedMenuItem._id,
            quantity: quantity,
          },
        ],
      };

      const createdOrder = await dispatch(placeOrder(orderData, token));

      if (!createdOrder) {
        throw new Error("Order creation failed");
      }

      const payableAmount = Number(createdOrder.totalAmount || computedTotalAmount);

      setOrderFlow({
        active: true,
        step: "payment",
        selectedMenuItem: flow.selectedMenuItem,
        quantity: quantity,
        pendingOrder: createdOrder,
      });

      appendAIMessage(
        `Perfect! Your order for ${quantity} plate(s) of ${flow.selectedMenuItem.name} is confirmed. Total amount: $${payableAmount}. Click the button below to proceed with payment.`,
        {
          kind: "order-payment-action",
          order: createdOrder,
          menuItem: flow.selectedMenuItem,
          quantity: quantity,
          totalAmount: payableAmount,
        }
      );
    } catch (error) {
      appendAIMessage(
        error?.message || "Failed to place order. Please try again."
      );
      setOrderFlow({
        active: false,
        step: "idle",
        selectedMenuItem: null,
        quantity: 0,
        pendingOrder: null,
      });
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  async function handleOrderPayNow(orderData) {
    if (!orderData || !token) {
      appendAIMessage("Unable to start payment right now. Please try again.");
      return;
    }

    try {
      await buyOrder(token, user, orderData, dispatch);
      appendAIMessage("Payment window opened. Please complete the payment there.");
      setOrderFlow({
        active: false,
        step: "idle",
        selectedMenuItem: null,
        quantity: 0,
        pendingOrder: null,
      });
    } catch (error) {
      appendAIMessage("Payment could not be started. Please try again.");
    }
  }

  async function continueBookingFlow(inputText) {
    const flow = bookingFlowRef.current;
    const nextData = { ...flow.data };

    if (flow.step === "checkIn") {
      const parsedDate = parseDateInput(inputText);
      if (!parsedDate) {
        appendAIMessage("Please share a valid check-in date, for example 2026-03-10.");
        return true;
      }

      nextData.checkIn = formatDateForApi(parsedDate);
      setBookingFlow((prev) => ({ ...prev, step: "checkOut", data: nextData }));
      appendAIMessage("Thank you. What is your check-out date?");
      return true;
    }

    if (flow.step === "checkOut") {
      const parsedDate = parseDateInput(inputText);
      if (!parsedDate) {
        appendAIMessage("Please share a valid check-out date, for example 2026-03-12.");
        return true;
      }

      const checkIn = new Date(nextData.checkIn);
      const checkOut = new Date(parsedDate);
      if (checkOut <= checkIn) {
        appendAIMessage("Check-out must be after check-in. Please enter a later check-out date.");
        return true;
      }

      nextData.checkOut = formatDateForApi(parsedDate);
      setBookingFlow((prev) => ({ ...prev, step: "guests", data: nextData }));
      appendAIMessage("How many guests will be staying?");
      return true;
    }

    if (flow.step === "guests") {
      const guests = parseGuestCount(inputText);
      if (!guests || guests < 1) {
        appendAIMessage("Please enter a valid number of guests.");
        return true;
      }

      nextData.guests = guests;
      setBookingFlow((prev) => ({ ...prev, step: "priceRange", data: nextData }));
      appendAIMessage("What is your preferred budget per night?");
      return true;
    }

    if (flow.step === "priceRange") {
      const range = parsePriceRange(inputText);
      if (!range) {
        appendAIMessage("Please share a budget like 'under 4000' or 'between 3000 and 5000'.");
        return true;
      }

      nextData.priceRange = range;
      setBookingFlow((prev) => ({ ...prev, step: "roomType", data: nextData }));
      appendAIMessage("Which room type do you prefer: Single, Double, Deluxe, Suite, or Any?");
      return true;
    }

    if (flow.step === "roomType") {
      const roomType = parseRoomType(inputText);
      if (!roomType) {
        appendAIMessage("Please choose one room type: Single, Double, Deluxe, Suite, or Any.");
        return true;
      }

      nextData.roomType = roomType;
      
      // Fetch available rooms for the date range
      const availableRoomList = await getAvailableRooms(
        nextData.checkIn,
        nextData.checkOut,
        token
      );

      // Filter by capacity, price range, and room type
      const options = (availableRoomList || [])
        .filter((roomItem) => Number(roomItem.capacity || 0) >= Number(nextData.guests || 1))
        .filter((roomItem) => {
          const price = Number(roomItem.pricePerNight || 0);
          const min = Number(nextData.priceRange?.min || 0);
          const max = Number.isFinite(nextData.priceRange?.max)
            ? Number(nextData.priceRange?.max)
            : Number.POSITIVE_INFINITY;
          return price >= min && price <= max;
        })
        .filter((roomItem) => {
          if (!nextData.roomType || nextData.roomType.value === "any") return true;
          return roomItem.type === nextData.roomType.value;
        })
        .sort((a, b) => Number(a.pricePerNight || 0) - Number(b.pricePerNight || 0))
        .slice(0, 6);

      if (!options.length) {
        setBookingFlow((prev) => ({ ...prev, step: "priceRange", data: nextData }));
        appendAIMessage(
          "I could not find rooms available for those dates with that budget and type. Please share a different budget range and I will show options."
        );
        return true;
      }

      setBookingFlow((prev) => ({
        ...prev,
        step: "selectRoom",
        data: nextData,
        options,
      }));

      appendAIMessage(
        "Great. Here are the best available options for your dates. Click any room card to continue.",
        {
          kind: "room-options",
          options,
          flowData: nextData,
        }
      );
      return true;
    }

    if (flow.step === "selectRoom") {
      const selected = matchSelectedRoomByText(inputText, flow.options || []);
      if (!selected) {
        appendAIMessage("Please click one of the room cards shown above, or type the room number.");
        return true;
      }

      await handleRoomSelection(selected, flow.data);
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (hasAutoGreetedRef.current) return;
    if (!speakerSupported) return;
    if (!chatRef.current.length) return;

    const firstAssistantMessage = chatRef.current.find((msg) => msg.role === "ai")?.text;
    if (!firstAssistantMessage) return;

    hasAutoGreetedRef.current = true;

    const timer = window.setTimeout(() => {
      speakReply(firstAssistantMessage);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [speakerSupported]);

  async function sendMessage(forcedMessage) {
    const trimmed = (forcedMessage ?? message).trim();
    if (!trimmed || loadingRef.current) return;

    const updatedChat = [...chatRef.current, { role: "user", text: trimmed }];
    chatRef.current = updatedChat;
    setChat(updatedChat);
    setMessage("");
    loadingRef.current = true;
    setLoading(true);

    try {
      // Check if order flow is active (user is ordering food)
      if (orderFlowRef.current.active && orderFlowRef.current.step === "askQuantity") {
        await handleOrderQuantityResponse(trimmed);
        return;
      }

      // Check if user wants to see menu
      if (shouldShowMenu(trimmed)) {
        await showMenuItems();
        return;
      }

      // Check if user wants to book a table at restaurant
      if (!bookingFlowRef.current.active && !tableBookingFlowRef.current.active && shouldStartTableBooking(trimmed)) {
        handleTableBookingRequest();
        return;
      }

      // Handle table booking flow
      if (tableBookingFlowRef.current.active) {
        const handledByTableFlow = await continueTableBookingFlow(trimmed);
        if (handledByTableFlow) return;
      }

      // Check if user wants to book a room
      if (!bookingFlowRef.current.active && !tableBookingFlowRef.current.active && shouldStartBookingFlow(trimmed)) {
        startBookingFlow();
        return;
      }

      if (bookingFlowRef.current.active) {
        const handledByBookingFlow = await continueBookingFlow(trimmed);
        if (handledByBookingFlow) return;
      }

      const aiReply = await askAIReceptionist(updatedChat);
      const nextChat = [...updatedChat, { role: "ai", text: aiReply }];
      chatRef.current = nextChat;
      setChat(nextChat);
      speakReply(aiReply);
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "AI service is unavailable right now. Please try again in a moment.";
      const nextChat = [
        ...updatedChat,
        {
          role: "ai",
          text: backendMessage,
        },
      ];
      chatRef.current = nextChat;
      setChat(nextChat);
      speakReply(backendMessage);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function toggleListening() {
    if (!micSupported || !recognitionRef.current || loading) return;

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    recognitionRef.current.start();
  }

  return (
    <section className="mt-6 sm:mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-5 py-3 sm:py-4 bg-linear-to-r from-amber-600 to-yellow-500 text-white">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">AI Receptionist</h2>
        <p className="text-xs sm:text-sm text-amber-50">Ask by typing or speaking. The receptionist can reply with voice.</p>
      </div>

      <div className="h-[55vh] min-h-80 max-h-[65vh] sm:h-80 sm:min-h-0 sm:max-h-none md:h-96 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 bg-gray-50">
        {chat.map((msg, index) => (
          <div key={`${msg.role}-${index}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[95%] sm:max-w-[85%] px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm leading-relaxed wrap-break-word ${
                msg.role === "user"
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p>{msg.text}</p>

              {msg.kind === "room-options" && Array.isArray(msg.options) && msg.options.length > 0 && (
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {msg.options.map((roomItem, optionIndex) => (
                    <button
                      key={roomItem._id}
                      type="button"
                      disabled={loading}
                      onClick={() => handleRoomSelection(roomItem, msg.flowData)}
                      className="text-left rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 p-3 disabled:opacity-60"
                    >
                      <p className="font-semibold text-amber-900">
                        Option {optionIndex + 1}: {roomItem.type} Room #{roomItem.roomNumber}
                      </p>
                      <p className="text-xs text-amber-800">Capacity: {roomItem.capacity} guests</p>
                      <p className="text-xs text-amber-800">Price: $ {roomItem.pricePerNight} per night</p>
                      {roomItem.image && (
                        <img
                          src={roomItem.image}
                          alt={`Room ${roomItem.roomNumber}`}
                          className="mt-2 w-full h-24 object-cover rounded-md"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {msg.kind === "table-options" && Array.isArray(msg.options) && msg.options.length > 0 && (
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {msg.options.map((tableItem, optionIndex) => {
                    const pricePerPerson = Number(tableItem.price || 0);
                    const totalPrice = pricePerPerson * Number(msg.flowData?.guests || 1);
                    
                    return (
                      <button
                        key={tableItem._id}
                        type="button"
                        disabled={loading}
                        onClick={() => handleTableSelection(tableItem, msg.flowData)}
                        className="text-left rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 p-3 disabled:opacity-60 transition-all"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-blue-900">
                            Option {optionIndex + 1}: Table #{tableItem.tableNumber}
                          </p>
                          {pricePerPerson > 0 && (
                            <div className="text-right">
                              <p className="text-xs font-bold text-green-700">${pricePerPerson}/person</p>
                              <p className="text-xs text-green-600">Total: ${totalPrice}</p>
                            </div>
                          )}
                        </div>
                        {tableItem.location && (
                          <p className="text-xs text-blue-800">📍 Location: {tableItem.location}</p>
                        )}
                        <p className="text-xs text-blue-800">👥 Capacity: {tableItem.capacity} guests</p>
                        {tableItem.features && tableItem.features.length > 0 && (
                          <p className="text-xs text-blue-800">
                            ✨ Features: {tableItem.features.join(", ")}
                          </p>
                        )}
                        {tableItem.image && (
                          <img
                            src={tableItem.image}
                            alt={`Table ${tableItem.tableNumber}`}
                            className="mt-2 w-full h-24 object-cover rounded-md border border-blue-200"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {msg.kind === "menu-display" && Array.isArray(msg.menuItems) && msg.menuItems.length > 0 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {msg.menuItems.map((menuItem) => (
                    <button
                      key={menuItem._id}
                      type="button"
                      disabled={loading}
                      onClick={() => handleMenuItemClick(menuItem)}
                      className="text-left rounded-lg border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all p-3 disabled:opacity-60 hover:shadow-md"
                    >
                      {menuItem.image && (
                        <img
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                      )}
                      <p className="font-bold text-orange-900 text-sm">{menuItem.name}</p>
                      <p className="text-xs text-gray-600 mt-1 mb-2 line-clamp-2">{menuItem.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-700 font-bold text-sm">$ {menuItem.price}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Add to Cart</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {msg.kind === "payment-action" && msg.booking && (
                <div className="mt-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-800">Booking Confirmed</span>
                    </div>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="mb-4 space-y-1">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Room:</span> {msg.booking.room?.type || 'Room'} #{msg.booking.room?.roomNumber || ''}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Total Amount:</span> 
                      <span className="text-green-700 font-bold ml-1">$ {msg.booking.totalPrice}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePayNow(msg.booking)}
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-lg bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-4 py-3 disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Pay Now - Secured Payment
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure payment gateway
                  </p>
                </div>
              )}

              {msg.kind === "order-payment-action" && msg.order && (
                <div className="mt-4 p-4 bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-blue-800">Order Placed</span>
                    </div>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="mb-4 space-y-1">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Item:</span> {msg.menuItem?.name || 'Food Item'}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Quantity:</span> {msg.quantity} plate(s)
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Total Amount:</span> 
                      <span className="text-blue-700 font-bold ml-1">$ {msg.totalAmount}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrderPayNow(msg.order)}
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-4 py-3 disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Order Now - Proceed to Payment
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure payment gateway
                  </p>
                </div>
              )}

              {msg.kind === "table-payment-action" && msg.booking && (
                <div className="mt-4 p-4 bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-purple-800">Table Reserved</span>
                    </div>
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="mb-4 space-y-1">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Table:</span> #{msg.table?.tableNumber || msg.booking.table?.tableNumber}
                    </p>
                    {(msg.table?.location || msg.booking.table?.location) && (
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">Location:</span> {msg.table?.location || msg.booking.table?.location}
                      </p>
                    )}
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Date:</span> {msg.flowData?.date || msg.booking.date}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Time:</span> {msg.flowData?.timeSlot || msg.booking.timeSlot}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Guests:</span> {msg.flowData?.guests || msg.booking.guests}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Total Amount:</span> 
                      <span className="text-green-700 font-bold ml-1">$ {msg.totalAmount || msg.booking.amount}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTablePayNow(msg.booking)}
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-lg bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-4 py-3 disabled:opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Pay Now - Confirm Booking
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  
                  <p className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure payment gateway
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <p className="text-xs text-gray-500">AI is typing...</p>}
        {fetchingRooms && <p className="text-xs text-gray-500">Loading room inventory...</p>}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage();
            }}
            autoComplete="off"
            enterKeyHint="send"
            placeholder="Ask about available rooms..."
            className="w-full min-w-0 sm:flex-1 border border-gray-300 rounded-lg px-4 py-3 sm:py-2 text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="grid grid-cols-3 sm:flex gap-2">
            <button
              type="button"
              onClick={toggleListening}
              disabled={!micSupported || loading}
              aria-label={isListening ? "Stop microphone" : "Start microphone"}
              title={isListening ? "Stop microphone" : "Start microphone"}
              className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border whitespace-nowrap min-h-11 sm:min-h-0 ${
                isListening
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-800 border-gray-300"
              } disabled:opacity-60`}
            >
              {isListening ? <Square size={16} /> : <Mic size={16} />}
            </button>

            <button
              type="button"
              onClick={() => setVoiceEnabled((prev) => !prev)}
              disabled={!speakerSupported}
              className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border whitespace-nowrap min-h-11 sm:min-h-0 ${
                voiceEnabled
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-white text-gray-700 border-gray-300"
              } disabled:opacity-60`}
            >
              {voiceEnabled ? "Voice On" : "Voice Off"}
            </button>

            <button
              type="button"
              onClick={sendMessage}
              disabled={loading}
              className="col-span-1 px-4 sm:px-5 py-2.5 sm:py-2 bg-amber-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-amber-700 disabled:opacity-60 whitespace-nowrap min-h-11 sm:min-h-0"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {!micSupported && (
        <p className="px-4 pb-4 text-xs text-gray-500">
          Microphone mode is not supported in this browser. Use Chrome or Edge and allow mic permission.
        </p>
      )}
    </section>
  );
}


