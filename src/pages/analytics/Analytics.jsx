import React from "react";
import { Box } from "@mui/system";
import { Container, Grid, Toolbar, Typography } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";

const drawerWidth = 240;

const BarChart = () => {
  const data = {
    labels: [
      "Math",
      "Biology",
      "Physics",
      "Chemistry",
      "Economics",
      "Geography",
      "Information Technology",
    ],
    datasets: [
      {
        label: "Accessed",
        data: [80, 110, 75, 97, 82, 99, 125],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(225, 80, 28, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 124, 72, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Most Accessed Course By Subject",
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

const LineChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "Mei",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
    ],
    datasets: [
      {
        label: "Number of Users 2021",
        data: [10, 25, 30, 45, 50, 70, 80, 85, 90, 100, 113],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

const PieChart = () => {
  const data = {
    labels: [
      "Math",
      "Biology",
      "Physics",
      "Chemistry",
      "Economics",
      "Geography",
      "Information Technology",
    ],
    datasets: [
      {
        label: "Total Courses By Subject",
        data: [12, 19, 13, 10, 12, 11, 24],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(150, 110, 72, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(150, 110, 72, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Typography align="center" variant="body1" sx={{ fontSize: 14, fontWeight: "500" }}>
        Total Courses By Subject
      </Typography>
      <Pie data={data} />
    </>
  );
};

const VerticalBarChart = () => {
  const data = {
    labels: [
      "Week 1 October",
      "Week 2 October",
      "Week 3 October",
      "Week 4 October",
      "Week 1 November",
      "Week 2 November",
    ],
    datasets: [
      {
        label: "Page Visits",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar data={data} />
    </>
  );
};

const Analytics = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {LineChart()}
            </Grid>
            <Grid item xs={12}>
              {BarChart()}
            </Grid>
            <Grid item xs={12}>
              {PieChart()}
            </Grid>
            <Grid item xs={12}>
              {VerticalBarChart()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Analytics;
