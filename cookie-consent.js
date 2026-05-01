(function(){
  const GA_ID = "G-H5VD0NFFWW";
  const STORAGE_KEY = "nikita_cookie_consent_v3";
  let banner = document.getElementById("cookie-consent");

  function loadAnalytics(){
    if (window.__nikitaAnalyticsLoaded) return;
    window.__nikitaAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(script);
  }

  function saveChoice(choice){
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch (error) {
      document.cookie = STORAGE_KEY + "=" + choice + "; path=/; max-age=31536000; SameSite=Lax";
    }
  }

  function readChoice(){
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      const match = document.cookie.match(new RegExp("(^| )" + STORAGE_KEY + "=([^;]+)"));
      return match ? match[2] : null;
    }
  }

  function closeBanner(){
    if (banner) banner.hidden = true;
  }

  function ensureBanner(){
    if (banner) return banner;

    banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.id = "cookie-consent";
    banner.setAttribute("aria-label", "Cookie notice");
    banner.hidden = true;
    banner.innerHTML = [
      '<div class="cookie-consent__text">',
      '<h2>Cookies</h2>',
      '<p>I use analytics cookies only to understand how the site is visited. The site works normally if you decline.</p>',
      '</div>',
      '<div class="cookie-consent__actions">',
      '<button class="cookie-consent__btn cookie-consent__btn--ghost" type="button" data-cookie-choice="declined">Decline</button>',
      '<button class="cookie-consent__btn" type="button" data-cookie-choice="accepted">Accept analytics</button>',
      '</div>'
    ].join("");
    document.body.appendChild(banner);
    return banner;
  }

  function trackEvent(name, params){
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  window.trackPortfolioEvent = trackEvent;

  function setupTracking(){
    document.addEventListener("click", function(event){
      const target = event.target.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = (target.textContent || "").trim();

      if (href.startsWith("mailto:")) {
        trackEvent("contact_email_click", { link_text: text, link_url: href });
        return;
      }

      if (href.includes("buy.stripe.com")) {
        trackEvent("stripe_checkout_click", { link_text: text, link_url: href });
        return;
      }

      if (target.matches("[data-qv]")) {
        const product = target.closest("[data-product]");
        trackEvent("store_view_click", {
          product_id: product ? product.getAttribute("data-product") : "",
          link_text: text || "VIEW"
        });
      }
    });
  }

  const choice = readChoice();
  if (choice === "accepted") {
    loadAnalytics();
    setupTracking();
    closeBanner();
    return;
  }

  if (choice === "declined") {
    closeBanner();
    return;
  }

  ensureBanner();
  banner.hidden = false;
  banner.addEventListener("click", function(event){
    const button = event.target.closest("[data-cookie-choice]");
    if (!button) return;
    const selected = button.getAttribute("data-cookie-choice");
    saveChoice(selected);
    if (selected === "accepted") {
      loadAnalytics();
      setupTracking();
    }
    closeBanner();
  });
})();
