// maid.js — отправка заявки в Google Sheets (через FormData)
const API_URL = "https://script.google.com/macros/s/AKfycbwg9u5cjwahtUJeZz6-friLUCSUkJx2aHQzwI_XAQxi0AOVfkoZSTrA17C8ow5JWi0z/exec";

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
            alert("Заявка отправлена! Проверь таблицу Google Sheets (лист «Заявки»).");
            form.reset();
        } catch (err) {
            console.error(err);
            alert("Ошибка при отправке. Проверь интернет или API.");
        }
    });
});
