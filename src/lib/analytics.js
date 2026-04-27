const GA_MEASUREMENT_ID = "G-ED4LGEG701";

export function trackPageView(path) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, params);
}

export function configureAnalytics() {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
}