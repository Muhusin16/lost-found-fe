"use client"

import React, { useState, useEffect } from "react";
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from "@/app/config/api.config";
import Image from "next/image";
import styles from "./dashboard.module.scss";

const ProductActivity = () => {
  const [itemCounts, setItemCounts] = useState({
    totalItems: 0,
    expiredItems: 0,
    claimedItems: 0,
    approvedItems: 0, 
    returnedItems: 0,
    rejectItems: 0,
    inProgressItems: 0,
    remainingItems: 0, 
  });

  const fetchAnalytics = async () => {
    try {
      const response = await axiosInstance.get(apiUrls.getAnalytics);
      console.log(response)
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

  const activities = [
    {
      image: "/inventory.svg", 
      count: itemCounts.totalItems,
      label: "Total Items",
    },
    {
      image: "/expired.svg", 
      count: itemCounts.expiredItems,
      label: "Expired Items",
    },
    {
      image: "/claimed.svg", 
      count: itemCounts.claimedItems,
      label: "Claimed Items",
    },
    {
      image: "/approved.svg", 
      count: itemCounts.approvedItems, 
      label: "Approved Items",
    },
    {
      image: "/returned.svg", 
      count: itemCounts.returnedItems,
      label: "Returned Items",
    },
    {
      image: "/rejected.svg", 
      count: itemCounts.rejectItems,
      label: "Rejected Items",
    },
    {
      image: "/inprogress.svg", 
      count: itemCounts.inProgressItems,
      label: "Items In Progress",
    },
    {
      image: "/warehouse.svg", 
      count: itemCounts.remainingItems,
      label: "Remaining Items",
    },
  ];

  return (
    <div className={styles.activityContainer}>
      <h2>Dashboard</h2>
      <div className={styles.activities}>
        {activities.map((activity, index) => (
          <div className={styles.activityCard} key={index}>
            <div className={styles.activityImage}>
              <Image src={activity.image} alt={activity.label} width={100} height={100} />
            </div>
            <div className={styles.activityCount}>{activity.count}</div>
            <div className={styles.activityLabel}>{activity.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductActivity;
