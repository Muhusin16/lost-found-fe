"use client"
import Image from "next/image";
import styles from "./product.module.scss";
import ProductFilter from "./productFilter/productFilter";
import { useState } from "react";
import { FaSearch, FaSyncAlt, FaDownload, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";


const initialProducts = [
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
 
  const router = useRouter();
  const [searchedTerm, setSearchedTerm] = useState(''); // abcdef
  const [products, setProducts] = useState(initialProducts);
  const [filterProducts, setFilterProducts] = useState(products);
  const [noResultFound, setNoResultFound] = useState('')

  const handleSearchChange = (e: any) => {
    console.log('Searchterm', e.target.value);
    let searchTerm = e.target.value;
    setSearchedTerm(searchTerm);

    if (!searchTerm) {
      setFilterProducts(products)
      setNoResultFound('');
    }

    const searchItem = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilterProducts(searchItem)
    console.log(searchItem)
    setNoResultFound('');

    const noSearchItemFound = products.find(p => p.name.toLowerCase().includes(searchedTerm.toLowerCase()));
    console.log('No search result found', noSearchItemFound);
    if (!noSearchItemFound) {
      setNoResultFound('Oops! Sorry, No search result found :(');
    }

  };

  // Reset searched product filter

  const handleSearchReset = () => {
    setFilterProducts(products);
    setSearchedTerm('');
    setNoResultFound('');
  }

  const handleProductDetails = (product:any) => {
    console.log('Product details', product);
    router.push(`/productlist/1`); // Navigate to product page with product name as query parameter

  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.filterSection}>
        <ProductFilter />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.productSearchContainer}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              value={searchedTerm}
              placeholder="Find products"
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={handleSearchReset}>
              <FaSyncAlt />
            </button>
            {/* <button className={styles.actionButton}>
              <FaDownload />
            </button>
            <button className={styles.actionButton}>
              <FaFilter />
            </button> */}
          </div>
          
        </div>
        <div className="text-center mt-5 flex flex-column justify-center align-center">
            <p className="text-xl">{noResultFound}</p>
        </div>
        <div className={styles.productsSection}>
          {filterProducts.map((product, index) => (
            <div className={styles.card} key={index} onClick={() => handleProductDetails(product)}>
              <div className={styles.cardImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                />
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
    </div>
  );
};

export default ProductCards;
