//! 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы.Пусть ключом для хранилища будет строка "feedback-form-state".
//! 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы.В противном случае поля должны быть пустыми.
//! 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
//! 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.Для этого добавь в проект и используй библиотеку lodash.throttle.


import throttle from "lodash.throttle";

const KEY_STORAGE = 'feedback - form - state';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextInput, 500));

populateText();

function onFormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const finalData = {};
    for (const [key, value] of formData.entries()) {
        if (!value) {
            alert("Заполните все поля!");
            return;
        }
        finalData[key] = value;
    }
    console.log(finalData);
    form.reset();
    localStorage.removeItem(KEY_STORAGE);
}

function onTextInput(e) {
    const { name, value } = e.target;
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const formData = {
            ...parsedData,
            [name]: value,
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
    } else {
        const formData = {
            [name]: value,
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
    }
};

function populateText() {
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const inputNames = Object.keys(parsedData);
        inputNames.forEach(inputName => {
            const input = formEl.elements[inputName];
            input.value = parsedData[inputName];
        });
    }
};