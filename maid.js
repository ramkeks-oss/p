// maid.js — localhost:8000/maid.html (через FormData)
const API_URL = "https://script.google.com/macros/s/AKfycbwM-DERytH4Kr0oTAQKU9dXsAJLTCJ7kxqJhXml5OPKZNCfqYA9G7H0mFfK4uqQmpuJqg/exec";

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

