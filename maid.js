// maid.js — отправка заявки в Google Sheets (через FormData)
const API_URL = "https://script.google.com/macros/s/AKfycbxa7jhUEjSubryWUrSsCShEb9wI96nYbpQLXta6ul2206o0JhZN7XbNnu33JDsQg1CX/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    try {
      await fetch(API_URL, { method: "POST", body: fd });
      alert("Заявка отправлена! Проверь таблицу Google Sheets (лист «Заявки»).");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке. Проверь интернет или API.");
    }
  });
});


