document.addEventListener("DOMContentLoaded", () => {
  // Tout eleman ki gen data-src oswa data-bg
  const lazyElements = document.querySelectorAll("img[data-src], video[data-src], [data-bg]");

  // Fonksyon pou chaje imaj, videyo oswa background
  const loadElement = (el) => {
    const tag = el.tagName.toLowerCase();

    // --- IMG ---
    if (tag === "img") {
      const src = el.getAttribute("data-src");
      if (src) {
        el.classList.add("lazy-loading");
        el.src = src;
        el.onload = () => {
          el.classList.remove("lazy-loading");
          el.classList.add("lazy-loaded");
          el.removeAttribute("data-src");
        };
      }
    }

    // --- VIDEO ---
    else if (tag === "video") {
      const src = el.getAttribute("data-src");
      if (src) {
        el.classList.add("lazy-loading");
        el.src = src;
        el.load();
        el.onloadeddata = () => {
          el.classList.remove("lazy-loading");
          el.classList.add("lazy-loaded");
          el.removeAttribute("data-src");
        };
      }
    }

    // --- BACKGROUND IMAGE ---
    else if (el.hasAttribute("data-bg")) {
      const bg = el.getAttribute("data-bg");
      if (bg) {
        el.classList.add("lazy-loading");
        el.style.backgroundImage = `url('${bg}')`;
        const img = new Image();
        img.src = bg;
        img.onload = () => {
          el.classList.remove("lazy-loading");
          el.classList.add("lazy-loaded");
          el.removeAttribute("data-bg");
        };
      }
    }
  };

  // --- IntersectionObserver (pou navigatè modèn) ---
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "150px 0px", threshold: 0.1 });

    lazyElements.forEach(el => {
      el.classList.add("lazy-loading");
      observer.observe(el);
    });
  }

  // --- Fallback pou vye navigatè ---
  else {
    const loadAll = () => lazyElements.forEach(loadElement);
    loadAll();
    window.addEventListener("scroll", loadAll);
    window.addEventListener("resize", loadAll);
    window.addEventListener("orientationchange", loadAll);
  }
});
