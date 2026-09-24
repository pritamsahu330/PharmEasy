import test from 'node:test';
import assert from 'node:assert/strict';

import {
  addMedicineToCart,
  calculateCartTotal,
  getExpenseSummary
} from '../logic.js';

test('addMedicineToCart adds and increments items', () => {
  const cart = [];

  addMedicineToCart(cart, 1, 1);
  addMedicineToCart(cart, 1, 2);

  assert.equal(cart.length, 1);
  assert.equal(cart[0].qty, 3);
});

test('calculateCartTotal returns summed cost', () => {
  const cart = [
    { id: 1, name: 'A', price: 5, qty: 2 },
    { id: 2, name: 'B', price: 10, qty: 1 }
  ];

  assert.equal(calculateCartTotal(cart), 20);
});

test('getExpenseSummary returns correct item count and total', () => {
  const cart = [
    { id: 1, name: 'A', price: 5, qty: 2 },
    { id: 2, name: 'B', price: 10, qty: 3 }
  ];

  const summary = getExpenseSummary('RX-1', cart);

  assert.equal(summary.prescriptionId, 'RX-1');
  assert.equal(summary.itemCount, 5);
  assert.equal(summary.totalExpense, 40);
});
