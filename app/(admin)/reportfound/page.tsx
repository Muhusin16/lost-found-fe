'use client';
import { useState, useEffect } from 'react';
import styles from './reportfound.module.scss';
import Image from 'next/image';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';
import { colors } from '@/app/config/data.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../config/firebase';
import axiosInstance from '@/app/services/axiosInterceptor';
import placeholderImg from '../../assets/placeholder-img.jpg'


// type CategoryKey = keyof typeof categories;
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
  const [categories, setCategories] = useState([])

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    setSelectedCategory(selectedCategoryName);

    const selectedCategory: any = categories.find(
      (category: any) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      setSubCategories(selectedCategory.sub_categories);
    } else {
      setSubCategories([]);
    }
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
        enteredBy: "66d169b8cad2d67bca5aec0d",
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
  const getAllCategories = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrls.categories}`);
      setCategories(response.data);
      setSubCategories(response.data[0].sub_categories);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllCategories();
  }, [])

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
                  <input type="text" className={styles.input} />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.formItem}>
                  <label htmlFor="primaryColor" className={styles.label}>Primary Color</label>
                  <select id="primaryColor" className={styles.input} value={selectedPrimaryColor} onChange={handlePrimaryColorChange}>
                    <option value="">Select a Primary Color</option>
                    {colors.primary.map((color) => (
                      <option key={color.name} value={color.name}>
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
                      <option key={color.name} value={color.name}>
                        {/* <span style={{ backgroundColor: color.hex }} className="inline-block w-4 h-4 rounded-full mr-2"></span> */}
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
                {categories && categories.map((category: any) => (
                  <option key={category} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="subCategory" className={styles.label} onChange={(e: any) => setFormData({ ...formData, subCategory: e.target.value })}>Subcategory</label>
              <select id="subCategory" className={styles.input} >
                {subCategories && subCategories.map((subCategory: any) => (
                  <option key={subCategory.id} value={subCategory.name}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
         {/*remove below brand ofter update */}
        {false &&  <div className={styles.grid}>
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
          </div>}
          <div className={styles.formItem}>
            <label className={styles.label}>New Category (if any)</label>
            <input type="text" className={styles.input} />
          </div>


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

          <div className='flex flex-col'>
            <div>
              <label className={styles.label}>Image upload</label>
              <p className={styles.imagesDescription}>Pictures paint a thousand words! Please upload a picture for your listing. You can upload up to 4 pictures. The first will be your primary for your listing. Image Size should not me more than 2 MB.</p>
            </div>
            <div className={styles.formItem}>
              <input type="file" multiple className={styles.input} onChange={handleImageChange} />
            </div>
          </div>

          <div className={styles.imageContainer}>
            <label className={styles.label}>Image Preview</label>
            <div className={styles.imagePreview}>
              {previewImages && previewImages.length > 0  ?  previewImages.map((previewImage: any) => (
                <div className='flex flex-wrap '>
                  <div className={styles.imageWrapper}>
                    <img src={previewImage} alt="Preview" className={styles.image} width={100} height={100} />
                  </div>
                </div>
              )): (<>
              <div className='flex flex-wrap '>
                <div className={styles.imageWrapper}>
                  <Image src={placeholderImg} alt="Preview" className={styles.image} width={100} height={100} />
                </div>
              <div className={styles.imageWrapper}>
                <Image src={placeholderImg} alt="Preview" className={styles.image} width={100} height={100} />
              </div>
              </div></>)}
              
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ReportFound;
