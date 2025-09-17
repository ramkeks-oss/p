// maid.js — универсальная отправка (URL-encoded + no-cors)
const API_URL = "https://script.google.com/macros/s/AKfycbwevA5orVK0dJr-rIWffAtlLc9e_35JprIAeNxRHmIvbKfIgyRW1WYnFie4MtmpB2yB/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"); // берём первую форму на странице
  if (!form) {
    alert("Форма не найдена на странице.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Собираем ВСЕ поля формы в urlencoded
    const fd = new FormData(form);
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) params.append(k, String(v));

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors", // без CORS-ошибок при локальном запуске
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });

      alert("Заявка отправлена! Проверь лист «Заявки» в Google Таблице.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить. Проверь интернет или URL API.");
    }
  });
});
