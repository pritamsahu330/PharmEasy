import {
  activePrescription,
  addMedicineToCart,
  calculateCartTotal,
  getExpenseSummary,
  medicines
} from './logic.js';

const cart = [];

const medicineList = document.getElementById('medicine-list');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const prescriptionId = document.getElementById('prescription-id');
const itemCount = document.getElementById('item-count');
const totalExpense = document.getElementById('total-expense');

prescriptionId.textContent = activePrescription.id;

function renderMedicines() {
  const prescribed = medicines.filter((medicine) =>
    activePrescription.medicineIds.includes(medicine.id)
  );

  medicineList.innerHTML = '';
  prescribed.forEach((medicine) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${medicine.name} - $${medicine.price.toFixed(2)}</span>`;

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => {
      addMedicineToCart(cart, medicine.id, 1);
      renderCart();
    });

    li.appendChild(button);
    medicineList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = '';

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    cartList.appendChild(li);
  });

  cartTotal.textContent = calculateCartTotal(cart).toFixed(2);

  const summary = getExpenseSummary(activePrescription.id, cart);
  itemCount.textContent = String(summary.itemCount);
  totalExpense.textContent = summary.totalExpense.toFixed(2);
}

renderMedicines();
renderCart();
