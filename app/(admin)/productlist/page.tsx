"use client"
import Image from "next/image";
import styles from "./product.module.scss";
import ProductFilter from "./productFilter/productFilter";
import { useEffect, useState } from "react";
import { FaSearch, FaSyncAlt, FaDownload, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { categories, colors } from '@/app/config/data.config';
import axios from "axios";
import { apiUrls } from "@/app/config/api.config";

type CategoryKey = keyof typeof categories;
type ColorKey = keyof typeof colors;

const initialProducts = [
  {
    title: "Bag",
    image: "/shopping-bags.svg",
    primaryColor: ["Pink", "Red"],
    category: "Bags, Baggage",
    subCategory: "Shopping bag",
    brand: "-",
    actionIcons: ["edit", "delete"],
  },
  {
    title: "Iphone 14",
    image: "/mobile-phone.svg",
    primaryColor: ["Black", "Grey"],
    category: "Electronics",
    subCategory: "Phone",
    brand: "Iphone",
    actionIcons: ["edit", "delete"],
  },
  {
    title: "Noise Watch 3",
    image: "/smart-watch.svg",
    primaryColor: ["Pink"],
    category: "Electronics",
    subCategory: "SmartWatch",
    brand: "Noise",
    actionIcons: ["edit", "delete"],
  },
  {
    title: "Red Bag",
    image: "/red-purse.svg",
    primaryColor: ["Red"],
    category: "Bags, Baggage",
    subCategory: "Purse",
    brand: "-",
    actionIcons: ["edit", "delete"],
  },
  {
    title: "Laptop",
    image: "/laptop.svg",
    primaryColor: ["Grey"],
    category: "Electronics",
    subCategory: "Laptop",
    brand: "Dell",
    actionIcons: ["edit", "delete"],
  },
  {
    title: "Grocery Bag",
    image: "/paper-bag.svg",
    primaryColor: ["Purple", "Blue"],
    category: "Bags, Baggage",
    subCategory: "Shopping bag",
    brand: "Puma",
    actionIcons: ["edit", "delete"],
  },
];



const ProductCards = () => {

  const router = useRouter();
  const [searchedTerm, setSearchedTerm] = useState(''); // abcdef
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  const [noResultFound, setNoResultFound] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Default to an empty string
  const [subCategories, setSubCategories] = useState<string[]>([]); // Empty array for subcategories initially
  const [brands, setBrands] = useState<string[]>([]); // Empty array for brands initially
  const [selectedBrand, setSelectedBrand] = useState<string>(''); // Default to an empty string
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<string>('');

  const handleSearchChange = (e: any) => {
    console.log('Searchterm', e.target.value);
    let searchTerm = e.target.value;
    setSearchedTerm(searchTerm);

    if (!searchTerm) {
      setFilterProducts(products)
      setNoResultFound('');
    }

    const searchItem = products.filter((p:any) => p.title.toLowerCase().includes(searchTerm.toLowerCase().trim()));

    if (searchItem.length == 0) {
      setNoResultFound('Oops! Sorry, No search result found :(');
    } else {
      setFilterProducts(searchItem)
      console.log(searchItem)
      setNoResultFound('');
    }

  };

  // Reset searched product filter

  const handleSearchReset = () => {
    setFilterProducts(products);
    setSearchedTerm('');
    setNoResultFound('');
  }

  const handleProductDetails = (product: any) => {
    console.log('Product details', product);
    router.push(`/productlist/1`); // Navigate to product page with product name as query parameter
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as CategoryKey;
    setSelectedCategory(category);
    setSubCategories(categories[category]?.subCategories || []); // Set subcategories based on selected category
    setBrands(categories[category]?.brands || []); // Set brands based on selected category
    setSelectedBrand(''); // Reset selected brand when category changes;
    const filteredProducts = filterProducts.filter((p:any) => p.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()))
    if (filteredProducts.length == 0) {
      setNoResultFound('Oops! Sorry, No products found for this category :(');
    } else {
      setFilterProducts(filteredProducts);
    }
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrimaryColor(event.target.value);
  };

  const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrls.products}`)
    console.log(response.data);
    setProducts(response.data.reverse());
    setFilterProducts(response.data.reverse());
    
  } catch (error) {
    console.log(error);
  }
  }
  useEffect(() => {
    fetchAllProducts()
  },[])

  const getImageUrl = (title:any) => {
   
    const imageUrl = initialProducts.filter((product:any) => product.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))

    if (imageUrl.length > 0) {
    return imageUrl[0]?.image;
    } else {
     return "/shopping-bags.svg"
  }
}

  return (
    <div className={styles.cardContainer}>
      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <h3>Filter The Product</h3>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="category" >Category</label>
              <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subCategory" >Subcategory</label>
              <select id="subCategory" >
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="brand" className={styles.label} >Brand</label>
              <select id="brand" value={selectedBrand} className={styles.input} onChange={handleBrandChange} disabled={brands.length === 0}>
                <option value="">Select a Brand</option> {/* Default option */}
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))
                ) : (
                  <option value="">No Brands Available</option>
                )}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="primaryColor" className={styles.label}>Color</label>
              <select id="primaryColor" className={styles.input} value={selectedPrimaryColor} onChange={handlePrimaryColorChange}>
                <option value="">Select Color</option>
                {colors.primary.map((color) => (
                  <option key={color.hex} value={color.hex}>
                    {/* <p style={{ backgroundColor: color.hex }} className="inline-block w-4 h-4 rounded-full mr-2"></p> */}
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>
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
          <p className="text-xl mb-2">{noResultFound}</p>
        </div>
        <div className={styles.productsSection}>
          {filterProducts.map((product:any, index) => (
            <div className={styles.card} key={index} onClick={() => handleProductDetails(product)}>
              <div className={styles.cardImage}>
                <Image
                  src={getImageUrl(product.title)}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.cardHeader}>
                <h3>{product.title}</h3>
              </div>
              <div className={styles.cardDetails}>
                <p>
                  <strong>Colors:</strong> {product?.primaryColor}
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
                {true && (
                  <button className={styles.editButton}>✏️</button>
                )}
                {true && (
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
