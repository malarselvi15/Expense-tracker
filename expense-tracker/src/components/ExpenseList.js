import { Container, Typography, Paper, Grid, Card, CardContent, Button } from "@mui/material";

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" gutterBottom align="center" style={{ fontWeight: "bold" }}>
          Expense List
        </Typography>
        {expenses.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No expenses added yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {expenses.map((expense) => (
              <Grid item xs={12} sm={6} md={4} key={expense.id}>
                <Card sx={{ backgroundColor: "#fff", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {expense.title}
                    </Typography>
                    <Typography variant="body1">💰 Amount: ${expense.amount}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      📅 Date: {expense.date}
                    </Typography>
                    {/* ✅ Fix: Make sure onClick is correctly assigned */}
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => onDelete(expense.id)} 
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
