import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50, date: "2024-02-07" },
    { id: 2, title: "Rent", amount: 500, date: "2024-02-01" },
    { id: 3, title: "Electricity", amount: 100, date: "2024-02-05" }
  ]);

  // ✅ Check login state on page load
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Handle login & store in localStorage
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  // ✅ Fix: Delete Expense Function
  const handleDeleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home setExpenses={setExpenses} />} />

        {/* ✅ Protected Route for Expenses */}
        <Route
          path="/expenses"
          element={isLoggedIn ? (
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          ) : (
            <Navigate to="/login" replace />
          )}
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
