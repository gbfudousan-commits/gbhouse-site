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

  /* ---- Contact form: topic-dependent fields (real estate / car rental / charter bus) ---- */
  var topicSelect = document.getElementById("topic");
  var realestateFields = document.getElementById("realestate-fields");
  var rentalFields = document.getElementById("rental-fields");
  var charterFields = document.getElementById("charter-fields");

  var TOPIC_MODES = {
    "租車服務": "rental",
    "包車諮詢": "charter"
  };

  function setTopicMode(mode) {
    if (!realestateFields || !rentalFields || !charterFields) return;
    realestateFields.style.display = mode === "realestate" ? "" : "none";
    rentalFields.style.display = mode === "rental" ? "" : "none";
    charterFields.style.display = mode === "charter" ? "" : "none";

    var purpose = document.getElementById("purpose");
    var budget = document.getElementById("budget");
    var rentalIds = ["pickup_date", "pickup_time", "return_date", "return_time"];
    var charterIds = ["charter_start_date", "charter_start_time", "charter_end_date", "charter_end_time"];

    if (purpose) purpose.disabled = mode !== "realestate";
    if (budget) budget.disabled = mode !== "realestate";
    rentalIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = mode !== "rental";
    });
    charterIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = mode !== "charter";
    });
  }

  function modeForTopic(value) {
    return TOPIC_MODES[value] || "realestate";
  }

  if (topicSelect) {
    topicSelect.addEventListener("change", function () {
      setTopicMode(modeForTopic(topicSelect.value));
    });

    /* Pre-fill from a link like contact.html?topic=租車服務&car=本田+N-BOX
       or contact.html?topic=包車諮詢 */
    var params = new URLSearchParams(window.location.search);
    var topicParam = params.get("topic");
    if (topicParam) {
      for (var i = 0; i < topicSelect.options.length; i++) {
        if (topicSelect.options[i].value === topicParam) {
          topicSelect.value = topicParam;
          break;
        }
      }
    }
    setTopicMode(modeForTopic(topicSelect.value));

    var carParam = params.get("car");
    var messageEl = document.getElementById("message");
    if (carParam && messageEl && !messageEl.value) {
      messageEl.value = "想詢問車款：" + carParam + "\n借車日期時間：\n還車日期時間：\n";
    }
  }

  /* Default the time selects to a sensible value (09:00) so they aren't
     stuck on 12:00am when a user never touches them. */
  ["pickup_time", "return_time", "charter_start_time", "charter_end_time"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = "09:00";
  });

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
