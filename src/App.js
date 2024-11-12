import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () =>{
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async ()=>{
        try{
            const response = await axios.get('https://expense-tacker-backend-three.vercel.app/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            
        }
    };

    const handleExpenseSubmit = async (expense) => {
        try{
            const response = await axios.post('https://expense-tacker-backend-three.vercel.app/expenses',expense);
            setExpenses([...expenses, response.data]);
        } catch (error){
            console.error('Error adding expense', error);
        }
    };

    const handleExpenseUpdate = async (id, updatedExpense) =>{
        try{
            const response = await axios.put(`https://expense-tacker-backend-three.vercel.app/expenses/${id}`, updatedExpense);
            const updatedExpenses = expenses.map((expense) => (expense._id === id? response.data : expense));
            setExpenses(updatedExpenses);
            setSelectedExpense(null);
        }catch(error){
            console.error('Error updating expense:', error);  
        }
    };

    const handleExpenseDelete = async (id) => {
        try{
            await axios.delete(`/${id}`);
            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
            
        }
    };

    return(
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseForm selectedExpense={selectedExpense} onExpenseUpdate={handleExpenseUpdate} onExpenseSubmit={handleExpenseSubmit} />
            <ExpenseList expenses={expenses} onEdit={setSelectedExpense} onDelete ={handleExpenseDelete} />
        </div>
    );
};

export default App;