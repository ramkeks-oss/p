// maid.js — localhost:8000/maid.html (через FormData)
const API_URL = "https://script.google.com/macros/s/AKfycbwg9u5cjwahtUJeZz6-friLUCSUkJx2aHQzwI_XAQXi0AOVfkoZSTrA17C8ow5JWiOz/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("maidForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fd = new FormData(form);

        try {
            await fetch(API_URL, {
                method: "POST",
                body: fd
            });
            alert("✅ Заявка отправлена! Проверь Google Таблицу (лист «Заявки»).");
            form.reset();
        } catch (err) {
            console.error(err);
            alert("❌ Ошибка при отправке. Проверь интернет или API.");
        }
    });
});

