import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ selectedExpense, onExpenseUpdate, onExpenseSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedExpense) {
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setDescription(selectedExpense.description);
    }
  }, [selectedExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExpense) {
      onExpenseUpdate(selectedExpense._id, { amount, category, description });
    } else {
      onExpenseSubmit({ amount, category, description });
    }
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        value={category}
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">{selectedExpense ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;
