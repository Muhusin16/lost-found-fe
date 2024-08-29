import Image from "next/image";
import styles from "./dashboard.module.scss";

const ProductActivity = () => {
  const activities = [
    {
      image: "/inventory.svg", // Replace with your actual image path
      count: 245,
      label: "Items Reported",
    },
    {
      image: "/warehouse.svg", // Replace with your actual image path
      count: 112,
      label: "Item Out",
    },
    {
      image: "/itemsout.svg", // Replace with your actual image path
      count: 36,
      label: "Item Out",
    },
  ];

  return (
    <div className={styles.activityContainer}>
      <h2>Dashboard</h2>
      <div className={styles.activities}>
        {activities.map((activity, index) => (
          <div className={styles.activityCard} key={index}>
            <div className={styles.activityImage}>
              <img
                src={activity.image}
                alt={activity.label}
              />
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
