import styles from "./productFilter.module.scss";

const ProductFilter = () => {
  return (
    <div className={styles.filterContainer}>
      <h3>Information of Product</h3>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="electronics">Electronics</option>
            <option value="bags">Bags</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subCategory">Sub-category</label>
          <select id="subCategory" name="subCategory">
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="smartwatch">SmartWatch</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="brand">Brands</label>
          <select id="brand" name="brand">
            <option value="iphone">Iphone</option>
            <option value="samsung">Samsung</option>
            <option value="mi">Mi Phone</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="color">Color</label>
          <select id="color" name="color">
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default ProductFilter;
