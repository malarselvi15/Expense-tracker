import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Grid, Card, CardContent, Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from MongoDB Atlas
  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then(response => setExpenses(response.data))
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  // Delete an expense
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id)))
      .catch(error => console.error("Error deleting expense:", error));
  };

  // Function to generate and download the PDF
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("Monthly Expense Report", 20, 20);

    // Filter expenses for the current month
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-based index)
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    if (monthlyExpenses.length === 0) {
      alert("No expenses recorded for this month.");
      return;
    }

    // Convert data into table format
    const tableColumn = ["Title", "Amount", "Date"];
    const tableRows = [];

    monthlyExpenses.forEach(expense => {
      const expenseData = [expense.title, `$${expense.amount}`, expense.date];
      tableRows.push(expenseData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`Expense_Report_${currentMonth}_${currentYear}.pdf`);
  };

  return (
    <Container maxWidth={false} style={{ width: "90%", margin: "0 auto" }}>
      <Paper 
        elevation={3} 
        style={{ padding: "30px", marginTop: "20px", backgroundColor: "#f5f5f5", width: "100%", boxSizing: "border-box" }}
      >
        <Typography variant="h5" gutterBottom align="center" style={{ fontWeight: "bold" }}>
          Expense List
        </Typography>

        {/* Download Report Button */}
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginBottom: "20px" }} 
          onClick={downloadReport}
        >
          Download Monthly Report 📄
        </Button>

        {expenses.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No expenses added yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {expenses.map((expense) => (
              <Grid item xs={12} sm={6} md={4} key={expense._id}>
                <Card sx={{ backgroundColor: "#fff", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {expense.title}
                    </Typography>
                    <Typography variant="body1">💰 Amount: ${expense.amount}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      📅 Date: {expense.date}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleDelete(expense._id)} 
                      style={{ marginTop: "10px" }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default ExpenseList;
