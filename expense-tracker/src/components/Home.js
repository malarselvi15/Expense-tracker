import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

const Home = ({ setExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount, date };

    try {
      // Send expense data to backend
      await axios.post("http://localhost:5000/add-expense", newExpense);

      // Update UI
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
      setTitle("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('https://img.freepik.com/free-psd/3d-rendering-business-still-life-background_23-2151128479.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: "30px",
          marginTop: "-80px",
          color: "white",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Welcome to the Expense Tracker
      </Typography>

      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", opacity: 0.95 }}>
          <Typography variant="h6" gutterBottom align="center">
            Add Expense
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Expense Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Expense
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
