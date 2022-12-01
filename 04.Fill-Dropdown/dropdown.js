import { render, html } from "./node_modules/lit-html/lit-html.js";
const url = "http://localhost:3030/jsonstore/advanced/dropdown";

const selectRoot = document.getElementById('menu');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function postData(text) {
    const response = await fetch(url, {
        method: "post",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(text)
    });

}
async function renderDropdown() {
    const items = await getData();
    render(Object.values(items).map(getItem), selectRoot);
}

function getItem(item) {
    return html`<option value="${item._id}">${item.text}</option>`
}
renderDropdown();

async function onSubmit(e) {
    e.preventDefault();
    const text = document.getElementById('itemText');
    if (text.value) {
        postData({ "text": text.value });
        renderDropdown();
        form.reset();
    }
}