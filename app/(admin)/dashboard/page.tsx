"use client";

import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2"; 
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import axiosInstance from "@/app/services/axiosInterceptor";
import { apiUrls } from "@/app/config/api.config";
import styles from "./dashboard.module.scss";

// Register required Chart.js components
ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ItemCounts {
  totalItems: number;
  expiredItems: number;
  claimedItems: number;
  approvedItems: number;
  returnedItems: number;
  rejectItems: number;
  inProgressItems: number;
  remainingItems: number;
  weeklyExpiry: { _id: { week: number; year: number }; count: number }[];
  monthlyExpiry: { _id: { month: number; year: number }; count: number }[];
}

const ProductActivity = () => {
  const [itemCounts, setItemCounts] = useState<ItemCounts>({
    totalItems: 0,
    expiredItems: 0,
    claimedItems: 0,
    approvedItems: 0,
    returnedItems: 0,
    rejectItems: 0,
    inProgressItems: 0,
    remainingItems: 0,
    weeklyExpiry: [],
    monthlyExpiry: [],
  });

  const fetchAnalytics = async () => {
    try {
      const response = await axiosInstance.get(apiUrls.getAnalytics);
      if (response.status === 200) {
        setItemCounts(response.data);
      }
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const barChartData = {
    labels: [
      "Total Items",
      "Expired Items",
      "Claimed Items",
      "Approved Items",
      "Returned Items",
      "Rejected Items",
      "Items In Progress",
      "Remaining Items"
    ],
    datasets: [
      {
        label: "Item Counts",
        data: [
          itemCounts.totalItems,
          itemCounts.expiredItems,
          itemCounts.claimedItems,
          itemCounts.approvedItems,
          itemCounts.returnedItems,
          itemCounts.rejectItems,
          itemCounts.inProgressItems,
          itemCounts.remainingItems,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Expired", "Claimed", "Approved", "Returned", "Rejected", "In Progress", "Remaining"],
    datasets: [
      {
        label: "Distribution",
        data: [
          itemCounts.expiredItems,
          itemCounts.claimedItems,
          itemCounts.approvedItems,
          itemCounts.returnedItems,
          itemCounts.rejectItems,
          itemCounts.inProgressItems,
          itemCounts.remainingItems,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 206, 86, 0.6)"
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const weeklyLabels = itemCounts.weeklyExpiry.map(item => `Week ${item._id.week} ${item._id.year}`);
  const weeklyData = itemCounts.weeklyExpiry.map(item => item.count);
  
  const weeklyChartData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: "Weekly Expiry Count",
        data: weeklyData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const monthlyLabels = itemCounts.monthlyExpiry.map(item => `${item._id.month}/${item._id.year}`);
  const monthlyData = itemCounts.monthlyExpiry.map(item => item.count);

  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Expiry Count",
        data: monthlyData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
<div className={styles.activityContainer}>
  <h2>Product Activity</h2>

  <div className={styles.activities}>
    {/* Bar Chart */}
    <div className={styles.chartContainer}>
      <h3>Item Counts (Bar Chart)</h3>
      <Bar data={barChartData} />
    </div>

    {/* Pie Chart */}
    <div className={styles.chartContainer}>
      <h3>Distribution of Items (Pie Chart)</h3>
      <Pie data={pieChartData} />
    </div>

    {/* Line Chart for Weekly Expiry */}
    <div className={styles.chartContainer}>
      <h3>Weekly Expiry Count (Line Chart)</h3>
      <Line data={weeklyChartData} />
    </div>

    {/* Line Chart for Monthly Expiry */}
    <div className={styles.chartContainer}>
      <h3>Monthly Expiry Count (Line Chart)</h3>
      <Line data={monthlyChartData} />
    </div>
  </div>
</div>

  );
};

export default ProductActivity;
