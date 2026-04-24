export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", name, params);
}

export function trackPageView(path) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", "G-ED4LGEG701", {
    page_path: path,
  });
}