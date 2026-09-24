export const medicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 5.0 },
  { id: 2, name: 'Amoxicillin 250mg', price: 12.5 },
  { id: 3, name: 'Vitamin D3', price: 8.0 }
];

export const activePrescription = {
  id: 'RX-1001',
  medicineIds: [1, 2, 3]
};

export function addMedicineToCart(cart, medicineId, qty = 1) {
  const medicine = medicines.find((item) => item.id === medicineId);
  if (!medicine || qty <= 0) {
    return cart;
  }

  const existing = cart.find((item) => item.id === medicineId);
  if (existing) {
    existing.qty += qty;
    return cart;
  }

  cart.push({ id: medicine.id, name: medicine.name, price: medicine.price, qty });
  return cart;
}

export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getExpenseSummary(prescriptionId, cart) {
  return {
    prescriptionId,
    itemCount: cart.reduce((sum, item) => sum + item.qty, 0),
    totalExpense: calculateCartTotal(cart)
  };
}
