// maid.js — отправка без CORS-ошибок (FormData + no-cors)
const API_URL = "https://script.google.com/macros/s/AKfycbwevA5orVK0dJr-rIWffAtlLc9e_35JprIAeNxRHmIvbKfIgyRW1WYnFie4MtmpB2yB/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm"); // убедись, что у формы id="maidForm"
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Собираем данные ровно как в форме (Город/Комната/Срочность и т.д.)
    const fd = new FormData(form);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",        // ← это отключит CORS-ошибку в браузере
        body: fd                // сервер поймёт как e.parameter
      });

      // Ответ будет opaque, это нормально
      alert("Заявка отправлена! Проверь лист «Заявки» в таблице.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить. Проверь интернет или URL API.");
    }
  });
});
