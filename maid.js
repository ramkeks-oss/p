// maid.js — отправка заявки в Google Sheets (JSON)
const API_URL = "https://script.google.com/macros/s/AKfycbx9ZNa8GUBufe6gK5ICvliTjANy1zky21Wiy__Xd0iT-JjNVnSdrdi6JwvlvsuEz1Sp/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Собираем данные
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name") || "",
      phone: fd.get("phone") || "",
      address: fd.get("address") || "",
      description: fd.get("description") || "",
      priority: fd.get("priority") || "Средний",
      preferredDate: fd.get("preferredDate") || "",
      source: "maid.html"
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.ok) {
        alert("Заявка отправлена! Проверь таблицу (лист «Заявки»).");
        form.reset();
      } else {
        alert("Ошибка от сервера: " + (result.error || "Неизвестно"));
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке. Проверь интернет или API.");
    }
  });
});

