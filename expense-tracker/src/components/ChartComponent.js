import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ChartComponent = ({ expenses }) => {
  // Prepare Data for Charts
  const expenseTitles = expenses.map((expense) => expense.title);
  const expenseAmounts = expenses.map((expense) => expense.amount);

  const data = {
    labels: expenseTitles,
    datasets: [
      {
        label: "Expense Amount",
        data: expenseAmounts,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ],
        borderColor: "#000",  // ✅ Added Border Color
        borderWidth: 1,       // ✅ Ensures better visibility
        barThickness: 20,     // ✅ Adjusts the width of bars
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "row",  // ✅ Aligns charts horizontally
        justifyContent: "center", 
        alignItems: "center", 
        gap: "50px",  
        width: "100%", 
        textAlign: "center",
        padding: "30px",
        flexWrap: "wrap"  // ✅ Wraps charts if the screen is small
      }}
    >
      {/* Pie Chart */}
      <div style={{ width: "40%", minWidth: "350px", height: "400px" }}>
        <h3>Pie Chart</h3>
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>

      {/* Horizontal Bar Chart (Fixed) */}
      <div style={{ width: "40%", minWidth: "350px", height: "400px" }}>
        <h3>Horizontal Bar Chart</h3>
        <Bar 
          data={data} 
          options={{
            indexAxis: "y",  // ✅ Makes bars horizontal
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: { beginAtZero: true },
            },
          }} 
        />
      </div>

      {/* Line Chart */}
      <div style={{ width: "40%", minWidth: "350px", height: "400px" }}>
        <h3>Line Chart</h3>
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default ChartComponent;
