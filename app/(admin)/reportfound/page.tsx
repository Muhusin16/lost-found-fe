'use client';
import { useState } from 'react';
import styles from './reportfound.module.scss';
import axios from 'axios';
import Image from 'next/image';


type CategoryKey = keyof typeof categories;
type ColorKey = keyof typeof colors;

const colors = {
  primary: [
    { name: 'Red', hex: '#FF5733' },
    { name: 'Blue', hex: '#3498DB' },
    { name: 'Green', hex: '#1ABC9C' },
    { name: 'Purple', hex: '#9B59B6' },
    { name: 'Orange', hex: '#E74C3C' },
  ],
  secondary: [
    { name: 'Dark Red', hex: '#C70039' },
    { name: 'Dark Blue', hex: '#2980B9' },
    { name: 'Teal', hex: '#16A085' },
    { name: 'Dark Purple', hex: '#8E44AD' },
    { name: 'Maroon', hex: '#C0392B' },
  ],
};

const categories = {
  Electronics: {
    subCategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'Accessories'],
    brands: ['Apple', 'Samsung', 'Sony', 'Dell', 'HP']
  },
  'Personal Items': {
    subCategories: ['Wallets', 'Keys', 'Watches', 'Jewelry', 'Eyewear'],
    brands: ['Fossil', 'Ray-Ban', 'Tissot', 'Gucci', 'Prada']
  },
  Bags: {
    subCategories: ['Backpacks', 'Handbags', 'Suitcases', 'Wallets', 'Purses'],
    brands: ['Samsonite', 'American Tourister', 'VIP', 'Wildcraft', 'Tommy Hilfiger']
  },
  Documents: {
    subCategories: ['Passports', 'ID Cards', 'Driving Licenses', 'Credit/Debit Cards', 'Other Official Papers'],
    brands: [] // No specific brands for documents
  },
  Clothing: {
    subCategories: ['Jackets', 'Hats', 'Scarves', 'Gloves', 'Shoes'],
    brands: ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara']
  },
  Accessories: {
    subCategories: ['Umbrellas', 'Belts', 'Sunglasses', 'Hats'],
    brands: ['Ray-Ban', 'Oakley', 'Gucci', 'Louis Vuitton', 'Hermes']
  },
  Miscellaneous: {
    subCategories: ['Toys', 'Books', 'Stationery', 'Musical Instruments'],
    brands: ['Lego', 'Fisher-Price', 'Crayola', 'Yamaha', 'Casio']
  }
};

const initialFormData = {
  title: "",
  dateLost: "",
  category: "",
  subCategory: "",
  brand: "",
  model: "",
  serialNumber: "",
  primaryColor: "",
  secondaryColor: "",
  specificDescription: "",
  specificLocation: "",
  imageUrl: [],
  enteredBy: "",
  createdAt: "",
  remarks: ""
};

const ReportFound = () => {

  const [tagsList, setTagsList] = useState<any>([])
  const [selectedTag, setSelectedTag] = useState('');
  const [formData, setFormData] = useState(initialFormData)
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Default to an empty string
  const [subCategories, setSubCategories] = useState<string[]>([]); // Empty array for subcategories initially
  const [brands, setBrands] = useState<string[]>([]); // Empty array for brands initially
  const [selectedBrand, setSelectedBrand] = useState<string>(''); // Default to an empty string
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<string>('');
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState<string>('');
  const [selectedItemType, setSelectedItemType] = useState('non-perishable');

  const addNewTags = () => {
    setTagsList((prv: any) =>
      [...prv, selectedTag]
    )
  }

  const removeTag = (tag:any) => {
    const updatedTagList = tagsList.filter((tagName:any) =>
      tagName != tag
    )
    setTagsList(updatedTagList)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as CategoryKey;
    setSelectedCategory(category);
    setSubCategories(categories[category]?.subCategories || []); // Set subcategories based on selected category
    setBrands(categories[category]?.brands || []); // Set brands based on selected category
    setSelectedBrand(''); // Reset selected brand when category changes
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(event.target.value);
  };

  const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrimaryColor(event.target.value);
  };

  const handleSecondaryColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSecondaryColor(event.target.value);
  };

  const handleChange = (event: any) => {
    console.log(event.target.value);

    setSelectedItemType(event.target.value);
  };

  const submitProductForm = async () => {
    try {
      // const payload = {
      //   title: "Blue Leather Suitcase",
      //   dateLost: "2024-08-20T14:30:00Z",
      //   category: "Bags",
      //   subCategory: "Backpack",
      //   brand: "Gucci",
      //   model: "GG Supreme",
      //   serialNumber: "1234567890",
      //   primaryColor: "Black",
      //   secondaryColor: "Gray",
      //   specificDescription: "A medium-sized black leather backpack with Gucci's GG Supreme pattern. Includes a front zip pocket and padded shoulder straps.",
      //   specificLocation: "Airport Terminal 2, near Gate 12",
      //   imageUrl: [
      //     "https://example.com/images/backpack1.jpg",
      //     "https://example.com/images/backpack2.jpg"
      //   ],
      //   enteredBy: "66cdc56c5967826559d6a15c",
      //   createdAt: "2024-08-20T14:30:00Z"
      // };

      const payload = {
        title: formData.title,
        dateLost: formData.dateLost,
        category: selectedCategory,
        subCategory: formData.subCategory,
        brand: selectedBrand,
        model: formData.model,
        serialNumber: formData.serialNumber,
        primaryColor: selectedPrimaryColor,
        secondaryColor: selectedSecondaryColor,
        specificDescription: formData.specificDescription,
        specificLocation: formData.specificLocation,
        enteredBy: "66cdc56c5967826559d6a15c",
        createdAt: formData.createdAt,
        remarks: formData.remarks,
        itemType: selectedItemType,
        imageUrl: [
          "https://example.com/images/backpack1.jpg",
          "https://example.com/images/backpack2.jpg"
        ],
      }

      console.log(payload);
      // console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

      const response = await axios.post('http://localhost:5002/api/products', payload, {
        headers: {
          'Content-Type': 'application/json', // Ensure the correct content type is set
        },
      });
      console.log('Product created successfully:', response.data);
    } catch (error: any) {
      console.error('Error creating product:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`${styles.reportFound} ${styles.container}`}>
      <h4 className={styles.heading}>Report Found Product</h4>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Item Name*</label>
              <input type="text" name='title' className={styles.input}
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData, title: e.target.value
                }))} />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Item Lost Date*</label>
              <input type="date" className={styles.input}
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData, dateLost: e.target.value
                }))} />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label htmlFor="category" className={styles.label}>Category</label>
              <select id="category" className={styles.input} value={selectedCategory} onChange={handleCategoryChange}>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="subCategory" className={styles.label}>Subcategory</label>
              <select id="subCategory" className={styles.input}>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
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
            <div className={styles.formItem}>
              <label className={styles.label}>New Category (if any)</label>
              <input type="text" className={styles.input} />
            </div>
          </div>


          <div className='flex flex-col'>
            <div>
              <label className={styles.label}>Image upload</label>
              <p className={styles.imagesDescription}>Pictures paint a thousand words! Please upload a picture for your listing. You can upload up to 4 pictures. The first will be your primary for your listing. Image Size should not me more than 2 MB.</p>
            </div>
            <div className={styles.formItem}>
              <input type="file" multiple className={styles.input} />
            </div>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.label}>
              <input
                type="radio"
                name="itemType"
                className={styles.input}
                value="non-perishable"
                checked={selectedItemType === 'non-perishable'}
                onChange={handleChange}
              />{" "}
              Non-Perishable
            </label>
            <label className={`${styles.radioLabel} ms-2`}>
              <input
                type="radio"
                name="itemType"
                className={styles.input}
                value="perishable"
                checked={selectedItemType === 'perishable'}
                onChange={handleChange}
              />{" "}
              Perishable
            </label>
          </div>
          {
            selectedItemType === 'non-perishable' && (<>
              <div className={styles.grid}>
                <div className={styles.formItem}>
                  <label className={styles.label}>Model no. / serial no. / lid no.</label>
                  <input type="text" className={styles.input} />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.formItem}>
                  <label htmlFor="primaryColor" className={styles.label}>Primary Color</label>
                  <select id="primaryColor" className={styles.input} value={selectedPrimaryColor} onChange={handlePrimaryColorChange}>
                    <option value="">Select a Primary Color</option>
                    {colors.primary.map((color) => (
                      <option key={color.hex} value={color.hex}>
                        {/* <p style={{ backgroundColor: color.hex }} className="inline-block w-4 h-4 rounded-full mr-2"></p> */}
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="secondaryColor" className={styles.label}>Secondary Color</label>
                  <select id="secondaryColor" className={styles.input} value={selectedSecondaryColor} onChange={handleSecondaryColorChange}>
                    <option value="">Select a Secondary Color</option>
                    {colors.secondary.map((color) => (
                      <option key={color.hex} value={color.hex}>
                        {/* <span style={{ backgroundColor: color.hex }} className="inline-block w-4 h-4 rounded-full mr-2"></span> */}
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </>)
          }

          <div className={`${styles.formItem} mt-2`}>
            <label className={styles.label}>Specific Description</label>
            <textarea className={styles.textarea}
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, specificDescription: e.target.value
              }))}></textarea>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Specific Location</label>
            <input type="text" className={styles.input}
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, specificLocation: e.target.value
              }))} />
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Remarks (if any)</label>
            <textarea className={styles.textarea}
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, remarks: e.target.value
              }))}></textarea>
          </div>
          <button type='button' onClick={submitProductForm} className={styles.saveButton}>Save & close</button>
        </div>

        <div className={styles.sideContainer}>
          <div className={styles.tagsContainer}>
            <label className={styles.label}>Add Tags to Products</label>
            <div className={styles.tagInputGroup}>
              <input
                type="text"
                className={styles.input}
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              />
              <button
                type="button"
                className={styles.addButton}
                onClick={() => addNewTags()}
              >
                Add Tag
              </button>
            </div>
            <div className={styles.tags}>
              {
                tagsList.map((tag: any, index: any) => (<>
                  <div key={index} className={styles.tagsList}>
                    <p>{tag}</p>
                    <p onClick={() => removeTag(tag)}>X</p>
                  </div></>
                ))
              }

            </div>
          </div>

          <div className={styles.imageContainer}>
            <label className={styles.label}>Image Preview</label>
            <div className={styles.imagePreview}>
              <div className='flex flex-wrap '>
                <div className={styles.imageWrapper}>
                  <Image src="/paper-bag.svg" alt="Preview" className={styles.image} width={100} height={100} />
                </div>
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/paper-bag.svg" alt="Preview" className={styles.image} width={100} height={100} />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/paper-bag.svg" alt="Preview" className={styles.image} width={100} height={100} />
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ReportFound;
