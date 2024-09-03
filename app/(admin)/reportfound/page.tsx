'use client';
import { useState, useEffect } from 'react';
import styles from './reportfound.module.scss';
import Image from 'next/image';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';
import { categories, colors } from '@/app/config/data.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../config/firebase';
import axiosInstance from '@/app/services/axiosInterceptor';


type CategoryKey = keyof typeof categories;
type ColorKey = keyof typeof colors;

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
  const router = useRouter();
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<string>('');
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState<string>('');
  const [selectedItemType, setSelectedItemType] = useState('non-perishable');
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const addNewTags = () => {
    setTagsList(prev => [...prev, selectedTag]);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploading(true);
  
      // Accumulate URLs for newly uploaded files
      const newImageUrls = await Promise.all(
        files.map(async (file) => {
          if (file) {
            try {
              const storage = getStorage(app);
              const storageRef = ref(storage, `/images/${file.name}`);
              await uploadBytes(storageRef, file);
              const downloadUrl = await getDownloadURL(storageRef);
              return downloadUrl;
            } catch (error) {
              console.error(error);
              return '';
            }
          }
          return '';
        })
      );
  
      // Update the previewImages state with existing images and new images
      setPreviewImages((prevImages) => [...prevImages, ...newImageUrls.filter(url => url !== '')]);
      setUploading(false);
    }
  };

  const removeTag = (tag: string) => {
    const updatedTagList = tagsList.filter(tagName => tagName !== tag);
    setTagsList(updatedTagList);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as CategoryKey;
    setSelectedCategory(category);
    setSubCategories(categories[category]?.subCategories || []);
    setBrands(categories[category]?.brands || []);
    setSelectedBrand('');
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItemType(event.target.value);
  };

  const submitProductForm = async () => {
    try {
      const payload = {
        ...formData,
        category: selectedCategory,
        subCategory: formData.subCategory,
        brand: selectedBrand,
        primaryColor: selectedPrimaryColor,
        secondaryColor: selectedSecondaryColor,
        itemType: selectedItemType,
        imageUrl: previewImages,
        enteredBy: "66cdc56c5967826559d6a15c",
        createdAt: new Date(),
      };

      console.log(payload);
    
      const response = await axiosInstance.post(`${apiUrls.products}`, payload)
      console.log('Product created successfully:', response.data);
      if (response.data) {
        router.push('/productlist');
      }
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
                onChange={(e) => setFormData(prevData => ({
                  ...prevData, title: e.target.value
                }))} />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Item Lost Date*</label>
              <input type="date" className={styles.input}
                onChange={(e) => setFormData(prevData => ({
                  ...prevData, dateLost: e.target.value
                }))} />
            </div>
          </div>

          <div className={styles.formGroup}>
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
            selectedItemType === 'non-perishable' && (<div className={styles.nonPerishableContainer}>
              <div className={styles.grid}>
                <div className={styles.formItem}>
                  <label className={styles.label}>Model no. / serial no.</label>
                  <input type="text" className={styles.input}
                    onChange={(e) => setFormData(prevData => ({
                      ...prevData, model: e.target.value
                    }))} />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.formItem}>
                  <label htmlFor="primaryColor" className={styles.label}>Primary Color</label>
                  <select id="primaryColor" className={styles.input} value={selectedPrimaryColor} onChange={handlePrimaryColorChange}>
                    <option value="">Select a Primary Color</option>
                    {colors.primary.map((color) => (
                      <option key={color.name} value={color.name}>
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
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>)
          }

          <div className={`${styles.grid} mt-2`}>
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
              <select id="subCategory" className={styles.input} value={formData.subCategory} onChange={(e) => setFormData(prevData => ({
                ...prevData, subCategory: e.target.value
              }))}>
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
              <label className={styles.label}>Brand</label>
              <select id="brand" className={styles.input} value={selectedBrand} onChange={handleBrandChange}>
                <option value="">Select a Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="specificDescription" className={styles.label}>Specific Description</label>
              <input type="text" className={styles.input}
                onChange={(e) => setFormData(prevData => ({
                  ...prevData, specificDescription: e.target.value
                }))} />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label htmlFor="specificLocation" className={styles.label}>Specific Location</label>
              <input type="text" className={styles.input}
                onChange={(e) => setFormData(prevData => ({
                  ...prevData, specificLocation: e.target.value
                }))} />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="imageUrl" className={styles.label}>Upload Image</label>
              <input type="file" id="imageUrl" className={styles.input} accept="image/*" multiple onChange={handleImageChange} />
              {uploading && <p>Uploading...</p>}
            </div>
          </div>
          <div className={styles.imagePreview}>
            {previewImages.map((url, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image src={url} alt={`Uploaded image ${index + 1}`} width={100} height={100} className={styles.image} />
              </div>
            ))}
          </div>

          <div className={styles.formItem}>
            <button type="button" className={styles.button} onClick={submitProductForm}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportFound;
