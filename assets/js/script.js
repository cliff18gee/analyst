/* Portfolio behaviour — vanilla JavaScript, no dependencies.
   Works on index.html and on pages inside /projects/ */
(function () {
  "use strict";
  var root = document.documentElement;
  var inProjects = /\/projects\//.test(location.pathname);
  var prefix = inProjects ? "../" : "";
  var D = (typeof portfolioData !== "undefined") ? portfolioData : null;

  /* ---------- Populate from data.js ---------- */
  if (D) {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var v = D[el.getAttribute("data-bind")];
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-bind-href]").forEach(function (el) {
      var v = D[el.getAttribute("data-bind-href")];
      if (v) el.href = v;
    });
    document.querySelectorAll("[data-bind-mailto]").forEach(function (el) {
      var v = D[el.getAttribute("data-bind-mailto")]; if (v) el.href = "mailto:" + v;
    });
    document.querySelectorAll("[data-bind-tel]").forEach(function (el) {
      var v = D[el.getAttribute("data-bind-tel")]; if (v) el.href = "tel:" + v.replace(/\s+/g, "");
    });
    var f = document.getElementById("contact-form");
    if (f && D.formspreeEndpoint) f.setAttribute("action", D.formspreeEndpoint);
  }
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("primary-nav");
  if (menuBtn && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var links = document.querySelectorAll('.nav-links a.link[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- CV viewer (shows on page, no download) ---------- */
  var dlg = document.getElementById("cv-dialog");
  var frame = document.getElementById("cv-frame");
  if (dlg && frame) {
    var cvPath = (D && D.resume) ? D.resume : "assets/documents/CV.pdf";
    var openCv = function () {
      if (!frame.getAttribute("src")) frame.setAttribute("src", cvPath + "#view=FitH");
      var nt = document.getElementById("cv-newtab"); if (nt) nt.href = cvPath;
      if (typeof dlg.showModal === "function") dlg.showModal(); else window.open(cvPath, "_blank", "noopener");
    };
    ["nav-cv", "hero-cv"].forEach(function (id) {
      var b = document.getElementById(id); if (b) b.addEventListener("click", openCv);
    });
    var closeBtn = document.getElementById("cv-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); }); // click backdrop
  }

  /* ---------- Contact form (Formspree) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var btn = document.getElementById("submit-btn");
    var fields = ["name", "email", "subject", "message"];

    var showStatus = function (type, text) {
      status.className = "form-status show " + type; status.textContent = text;
    };
    var validate = function () {
      var ok = true, firstBad = null;
      fields.forEach(function (n) {
        var input = form.elements[n]; var wrap = input.closest(".field");
        var valid = input.value.trim() !== "" && (n !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
        wrap.classList.toggle("invalid", !valid);
        input.setAttribute("aria-invalid", String(!valid));
        if (!valid) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    };
    fields.forEach(function (n) {
      form.elements[n].addEventListener("input", function () {
        this.closest(".field").classList.remove("invalid"); this.setAttribute("aria-invalid", "false");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (!validate()) return;
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending…";
      fetch(form.getAttribute("action"), {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) { form.reset(); showStatus("success", "Thank you — your message has been sent. I will reply as soon as I can."); }
        else { return r.json().then(function (d) {
          throw new Error(d && d.errors ? d.errors.map(function (x) { return x.message; }).join(", ") : "Error"); }); }
      }).catch(function () {
        showStatus("error", "Sorry, your message could not be sent. Please try again or email me directly" + (D && D.email ? " at " + D.email : "") + ".");
      }).finally(function () { btn.disabled = false; btn.textContent = original; });
    });
  }
})();
