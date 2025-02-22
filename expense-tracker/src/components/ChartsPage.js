import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import ChartComponent from "./ChartComponent"; // ✅ Import the ChartComponent

const ChartsPage = ({ expenses }) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" gutterBottom align="center" style={{ fontWeight: "bold" }}>
          Expense Charts
        </Typography>
        <ChartComponent expenses={expenses} />
      </Paper>
    </Container>
  );
};

export default ChartsPage;
