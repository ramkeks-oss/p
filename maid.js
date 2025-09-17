// maid.js — форма для горничной

const API_URL = "const API_URL = "https://script.google.com/macros/s/AKfycbx9ZNa8GUBufe6gK5ICvliTjANy1zky21Wiy__Xd0iT-JjNVnSdrdi6JwvlvsuEz1Sp/exec";
";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("maidForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // собираем данные из формы
    const data = {
      city: document.getElementById("city").value,
      apartment: document.getElementById("apartment").value,
      room: document.getElementById("room").value,
      urgency: document.getElementById("urgency").value,
      description: document.getElementById("description").value,
      photoBefore: document.getElementById("photoBefore").value,
      photoAfter: document.getElementById("photoAfter").value,
      video: document.getElementById("video").value
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.ok) {
        alert(`Заявка создана! ID: ${result.id}`);
        form.reset();
      } else {
        alert("Ошибка при создании заявки: " + (result.error || "неизвестная ошибка"));
      }
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить заявку. Проверьте интернет или API.");
    }
  });
});
