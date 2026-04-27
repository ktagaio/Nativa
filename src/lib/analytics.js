const GA_MEASUREMENT_ID = "G-ED4LGGE701";

function shouldDebugAnalytics() {
  return import.meta.env.DEV;
}

export function trackPageView(path) {
  if (typeof window === "undefined" || !window.gtag) return;

  const params = {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  };

  if (shouldDebugAnalytics()) {
    params.debug_mode = true;
    console.log("GA page_view sent:", path, params);
  }

  window.gtag("event", "page_view", params);
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  const eventParams = {
    ...params,
  };

  if (shouldDebugAnalytics()) {
    eventParams.debug_mode = true;
    console.log("GA event sent:", eventName, eventParams);
  }

  window.gtag("event", eventName, eventParams);
}