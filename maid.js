// maid.js — универсальная отправка всех полей формы как есть (FormData + no-cors)
const API_URL = "https://script.google.com/macros/s/AKfycbwevA5orVK0dJr-rIWffAtlLc9e_35JprIAeNxRHmIvbKfIgyRW1WYnFie4MtmpB2yB/exec";

document.addEventListener("DOMContentLoaded", () => {
  // Берём ПЕРВУЮ форму на странице (не важно, как называются поля)
  const form = document.querySelector("form");
  if (!form) {
    alert("Форма не найдена на странице.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form); // соберёт все <input>, <select>, <textarea> по их name

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",   // чтобы не было CORS-ошибки локально
        body: fd           // Apps Script примет это в e.parameter
      });

      alert("Заявка отправлена! Проверь лист «Заявки» в Google Таблице.");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить. Проверь интернет или URL API.");
    }
  });
});
