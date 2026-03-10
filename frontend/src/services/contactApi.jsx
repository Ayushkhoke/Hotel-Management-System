import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { contact } from "./apis";

export async function submitContactForm(formData) {
  try {
    const response = await apiConnector(
      "POST",
      contact.CREATE_CONTACT_API,
      formData,
      {
        "Content-Type": "application/json",
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to submit contact form");
    }

    toast.success("Contact details submitted successfully");
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to submit contact form";
    toast.error(errorMessage);
    throw error;
  }
}
