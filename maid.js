// maid.js — отправка заявки (FormData + no-cors)
const API_URL = "https://script.google.com/macros/s/AKfycbwevA5orVK0dJr-rIWffAtlLc9e_35JprIAeNxRHmIvbKfIgyRW1WYnFie4MtmpB2yB/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm"); // у формы должен быть id="maidForm"
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",      // убирает CORS-ошибку
        body: fd              // Apps Script прочитает как e.parameter
      });

      alert("Заявка отправлена! Проверь лист «Заявки» в таблице.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить. Проверь интернет или URL API.");
    }
  });
});
