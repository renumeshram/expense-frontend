import React from  'react';
import axios from 'axios';

const ExpenseList = ({ expenses, onEdit, onDelete }) =>{
    return(
        <ul>
            {expenses.map((expense) => (
                <li key={expense._id}>
                    <div>
                        <strong>Amount:</strong> {expense.amount} <strong>Category:</strong>{expense.category}<strong>Description:</strong>{expense.description}
                        <button onClick={() => onEdit(expense)}>Edit</button>
                        <button onClick={() => onDelete(expense._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;