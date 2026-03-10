const hintedOrigins = new Set();
let backendWarmupPromise;

export function addOriginHints(url) {
  if (typeof document === "undefined" || !url) {
    return () => {};
  }

  const origin = new URL(url).origin;
  if (hintedOrigins.has(origin)) {
    return () => {};
  }

  hintedOrigins.add(origin);

  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = origin;
  preconnect.crossOrigin = "";

  const dnsPrefetch = document.createElement("link");
  dnsPrefetch.rel = "dns-prefetch";
  dnsPrefetch.href = origin;

  document.head.appendChild(preconnect);
  document.head.appendChild(dnsPrefetch);

  return () => {
    preconnect.remove();
    dnsPrefetch.remove();
    hintedOrigins.delete(origin);
  };
}

export function warmBackendConnection(url) {
  if (typeof window === "undefined" || !url) {
    return Promise.resolve();
  }

  addOriginHints(url);

  if (!backendWarmupPromise) {
    backendWarmupPromise = fetch(url, {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
      keepalive: true,
    })
      .catch(() => null)
      .then(() => undefined);
  }

  return backendWarmupPromise;
}

export function scheduleIdleTask(task, timeout = 1200) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(task, 300);
  return () => window.clearTimeout(timeoutId);
}