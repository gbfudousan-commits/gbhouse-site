(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      header.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        header.classList.contains("open") ? "true" : "false"
      );
    });
    header.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
      });
    });
  }

  /* ---- Language switch (persists via localStorage) ---- */
  var LANG_KEY = "gb-house-lang";

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "ja" ? "ja" : "zh-Hant");
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var saved = "zh";
    try { saved = localStorage.getItem(LANG_KEY) || "zh"; } catch (e) {}
    applyLang(saved);
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.dataset.lang);
      });
    });
  }
  initLang();

  /* ---- Contact form: sends directly, no email client needed ----
     Uses Web3Forms (https://web3forms.com) — a free, keyless-signup
     service for static sites. The access key below must be replaced
     with the real one before the form will deliver mail; see the
     README for the 1-minute setup. */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var statusEl = document.getElementById("form-status");
      var submitBtn = form.querySelector("button[type=submit]");
      var accessKey = form.querySelector('input[name="access_key"]').value;
      var lang = document.documentElement.getAttribute("lang") === "ja" ? "ja" : "zh";
      var msgs = {
        placeholder: {
          zh: "表單尚未設定完成，請聯絡網站管理者（需先至 web3forms.com 取得 Access Key）。",
          ja: "フォームの設定が未完了です（web3forms.com でアクセスキーを取得してください）。"
        },
        sending: { zh: "傳送中…", ja: "送信中…" },
        success: { zh: "已送出，我們會盡快與您聯繫，謝謝！", ja: "送信しました。担当者より折り返しご連絡いたします。" },
        error: { zh: "傳送失敗，請改用 LINE 或直接寄信給我們。", ja: "送信に失敗しました。LINEまたはメールで直接ご連絡ください。" }
      };

      if (!accessKey || accessKey.indexOf("PASTE_YOUR") === 0) {
        statusEl.textContent = msgs.placeholder[lang];
        return;
      }

      statusEl.textContent = msgs.sending[lang];
      if (submitBtn) submitBtn.disabled = true;

      var data = new FormData(form);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            statusEl.textContent = msgs.success[lang];
            form.reset();
          } else {
            statusEl.textContent = msgs.error[lang];
          }
        })
        .catch(function () {
          statusEl.textContent = msgs.error[lang];
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
