let currentSlide = 0;

const moveSlide = (direction) => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  const offset = -currentSlide * 100;

  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
};

document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));

setInterval(() => moveSlide(1), 5000); 

moveSlide(0);


////////////////////////////

const menu = document.querySelector(".menu");
const total_count = document.querySelector(".total_count");
const box = document.querySelector(".box");
const row = document.querySelector(".row");
let totalQuantity = null

import { categories, price, local_data } from "./data.js";
let getArr = JSON.parse(localStorage.getItem("akira")) || [];




const render = async () => {
  const data = await categories();

  menu.innerHTML = data.map((item) => `
    <button class="btn font-normal text-[22px] text-[#08121b] hover:text-[#1a4823]" data-item="${item}">${item}</button>
  `).join("");


  if (data.length > 0) {
    renderData(data[0]);
    for (let i of btn) {
      i.style.color = ""
      i.style.borderBottom = ""
    }
    e.target.style.color = "red"
    e.target.style.borderBottom = "3px solid red"
  }

};

render();

const renderData = async (item) => {
  const data = await price(item);
  box.innerHTML = data?.map((item) => `
    <div class="w-[300px] border border-spacing-3 pt-[10px] pb-[10px] pl-[17px] pr-[17px]">
      <img class="w-[180px] h-[180px] ml-auto mr-auto" src="${item.image}" alt="">
      <h1 class="font-medium text-[18px] text-center mt-[10px]">${item.title}</h1>
      <div class="flex gap-[20px] items-center  justify-center">
        <p class="font-medium text-[#262626] text-[18px]">${item.price}$</p>
        <p class="text-[#ee2626]">24% Off</p>
        <strong class="font-medium text-[16px] text-[#250505]">${item.category}</strong>
        </div>
        <button class="text-bold text-[#1b1b1b] rounded-[8px] p-[6px] border border-spacing-2 ml-auto mr-auto mt-[10px] bg-[#e3e4e5]" data-id="${item.id}" data-item="${item.category}">Add</button>
    </div>
  `).join("") || "No items available.";
};

menu.addEventListener('click', (e) => {
  const data = e.target.dataset.item;
  if (data) {
    renderData(data);
  }

});

const renderCart = () => {
  row.innerHTML = getArr.map((item) => `
    <div class="w-[400px] border border-spacing-3 pt-[10px] pb-[10px] pl-[17px] pr-[17px]">
      <img class="w-[300px] h-[150px] ml-auto mr-auto mb-[10px]" src="${item.image}" alt="img">
      <h1 class="font-medium text-[18px] text-center">${item.title}</h1>
      <p class="text-[#982222]">${item.price}$</p>
      <strong class="font-medium text-[16px] text-[#250505]">Quantity: ${item.quantity}</strong>
      <div class="flex justify-between">
        <strong class="font-medium text-[16px] text-[#250505]">${item.category}</strong>
        <button class="text-bold text-[#f6f1f1] rounded-[8px] p-[6px] border border-spacing-2 bg-[#146734]" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("") || "Cart is empty.";

  const totalPrice = getArr.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalElement = document.querySelector("#total-price");
  totalElement.textContent = `Total Price: ${totalPrice}$`;

  totalQuantity = getArr.reduce((total, item) => total + item.quantity, 0);
  const quantityElement = document.querySelector("#total-quantity");
  quantityElement.textContent = `Total Items: ${totalQuantity}`;
};

const deleteCart = (id) => {
  getArr = getArr.filter(item => item.id !== Number(id));
  localStorage.setItem("akira", JSON.stringify(getArr));
  renderCart();
};

const renderId = async (id, item) => {
  const data = await local_data(id, item);
  if (data) {
    const existingItem = getArr.find(cartItem => cartItem.id === data.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      data.quantity = 1;
      getArr.push(data);
    }
    localStorage.setItem("akira", JSON.stringify(getArr));
    renderCart();
  }
};

renderCart();

box.addEventListener('click', (e) => {
  const button = e.target.closest('[data-id]');
  if (button) {
    const id = button.dataset.id;
    const item = button.dataset.item;
    renderId(id, item);
  }
});

row.addEventListener('click', (e) => {
  const button = e.target.closest('[data-id]');
  if (button) {
    const id = button.dataset.id;
    deleteCart(id);
  }
});


total_count.innerHTML = `<p class="text-[white]">${totalQuantity}</p>`;
