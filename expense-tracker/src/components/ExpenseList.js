import { Container, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const ExpenseList = ({ expenses = [] }) => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom align="center">
          Expense List
        </Typography>
        {expenses.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No expenses added yet.
          </Typography>
        ) : (
          <List>
            {expenses.map((expense, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={expense.title}
                  secondary={`Amount: $${expense.amount} | Date: ${expense.date}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ExpenseList;
