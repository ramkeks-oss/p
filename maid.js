// maid.js — отправка без CORS-ошибки (no-cors + FormData)
const API_URL = "https://script.google.com/macros/s/AKfycbx9ZNa8GUBufe6gK5ICvliTjANy1zky21Wiy__Xd0iT-JjNVnSdrdi6JwvlvsuEz1Sp/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",   // ⬅️ ключ к устранению ошибки в консоли
        body: fd
      });

      // ответ будет "opaque", поэтому просто считаем, что ушло
      alert("Заявка отправлена! Проверь лист «Заявки» в Google Таблице.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить. Проверь интернет или URL API.");
    }
  });
});
