"use client"; // Add this line at the top
import { useState } from "react";
import { FaSearch, FaSyncAlt, FaDownload, FaFilter } from "react-icons/fa";
import styles from "./productSearch.module.scss";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.productSearchContainer}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Find products"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <FaSyncAlt />
        </button>
        <button className={styles.actionButton}>
          <FaDownload />
        </button>
        <button className={styles.actionButton}>
          <FaFilter />
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;
