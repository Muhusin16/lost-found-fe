import styles from "./product.module.scss";
import ProductFilter from "./productFilter/productFilter";

const products = [
  {
    name: "Bag",
    image: "/shopping-bags.svg",
    colors: ["Pink", "Red"],
    category: "Bags, Baggage",
    subCategory: "Shopping bag",
    brand: "-",
    actionIcons: ["edit", "delete"],
  },
  {
    name: "Iphone 14",
    image: "/mobile-phone.svg",
    colors: ["Black", "Grey"],
    category: "Electronics",
    subCategory: "Phone",
    brand: "Iphone",
    actionIcons: ["edit", "delete"],
  },
  {
    name: "Noise Watch 3",
    image: "/smart-watch.svg",
    colors: ["Pink"],
    category: "Electronics",
    subCategory: "SmartWatch",
    brand: "Noise",
    actionIcons: ["edit", "delete"],
  },
  {
    name: "Red Bag",
    image: "/red-purse.svg",
    colors: ["Red"],
    category: "Bags, Baggage",
    subCategory: "Purse",
    brand: "-",
    actionIcons: ["edit", "delete"],
  },
  {
    name: "Laptop",
    image: "/laptop.svg",
    colors: ["Grey"],
    category: "Electronics",
    subCategory: "Laptop",
    brand: "Dell",
    actionIcons: ["edit", "delete"],
  },
  {
    name: "Grocery Bag",
    image: "/paper-bag.svg",
    colors: ["Purple", "Blue"],
    category: "Bags, Baggage",
    subCategory: "Shopping bag",
    brand: "Puma",
    actionIcons: ["edit", "delete"],
  },
];

const ProductCards = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.filterSection}>
        <ProductFilter />
      </div>
      <div className={styles.productsSection}>
        {products.map((product, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.cardHeader}>
              <h3>{product.name}</h3>
            </div>
            <div className={styles.cardDetails}>
              <p>
                <strong>Colors:</strong> {product.colors.join(", ")}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Sub-category:</strong> {product.subCategory}
              </p>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            </div>
            <div className={styles.cardActions}>
              {product.actionIcons.includes("edit") && (
                <button className={styles.editButton}>✏️</button>
              )}
              {product.actionIcons.includes("delete") && (
                <button className={styles.deleteButton}>🗑️</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
