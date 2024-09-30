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
import { addProductAsync } from '../../store/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';


type ColorKey = keyof typeof colors;

const initialFormData = {
  item_name: "",
  item_lost_date: "",
  category: "",
  sub_category: "",
  new_category: "",
  brand: "",
  model_number: "",
  serial_number: "",
  primary_color: "",
  secondary_color: "",
  item_description: "",
  location_description: "",
  image_urls: null,
  additional_remarks: "",
  tags:[],
  retention_period_days:90,
  storage_info: {
    shelf_no : '',
    rack_no : ''
  }

};

const ReportFound = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
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
      const newImageUrls = await Promise.all(
        files.map(async (file) => {
          if (file) {
            const formData = new FormData();
          formData.append('file', file); 
            try {
              const response = await axiosInstance.post(`${apiUrls.imageUpload}`, formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },})
                  if (response.data.success) {
                    return response.data.data.path;
                  }
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
      const payload: any = {
        ...formData,
        category: selectedCategory,
        sub_category: formData.sub_category,
        primary_color: selectedPrimaryColor,
        secondary_color: selectedSecondaryColor,
        item_type: selectedItemType,
        image_urls: previewImages,
        };
      
      await dispatch(addProductAsync(payload)).unwrap();
      router.push('/productlist');

    } catch (error: any) {
      console.error('Error creating product:', error.response?.data || error.message);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrls.categories}`);
      if (response.data.success) {

        setCategories(response.data.data);
        setSubCategories(response.data.data[0].sub_categories);
      }
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
              <input type="text" name='item_name' className={styles.input}
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData, item_name: e.target.value
                }))} />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Item Lost Date*</label>
              <input type="date" name='item_lost_date' className={styles.input}
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData, item_lost_date: e.target.value
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
                  <label htmlFor="primary_color" className={styles.label}>Primary Color</label>
                  <select id="primary_color" className={styles.input} value={selectedPrimaryColor} onChange={handlePrimaryColorChange}>
                    <option value="">Select a Primary Color</option>
                    {colors.primary.map((color,index) => (
                      <option key={index} value={color.name}>
                        {/* <p style={{ backgroundColor: color.hex }} className="inline-block w-4 h-4 rounded-full mr-2"></p> */}
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="secondary_color" className={styles.label}>Secondary Color</label>
                  <select id="secondary_color" className={styles.input} value={selectedSecondaryColor} onChange={handleSecondaryColorChange}>
                    <option value="">Select a Secondary Color</option>
                    {colors.secondary.map((color,index) => (
                      <option key={index} value={color.name}>
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
                {categories && categories.map((category: any,index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="subCategory" className={styles.label} >Subcategory</label>
              <select id="subCategory" className={styles.input} 
              onChange={(e: any) => setFormData({ ...formData, sub_category: e.target.value })}>
                {subCategories && subCategories.map((subCategory: any,index:number) => (
                  <option key={index} value={subCategory.name}>
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
                  brands.map((brand,index) => (
                    <option key={index} value={brand}>
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
            <input type="text" name='new_category' className={styles.input} 
            onChange={(e) => setFormData((prev:any) => ({...prev,new_category:e.target.value}))}/>
          </div>


          <div className={`${styles.formItem} mt-2`}>
            <label className={styles.label}>Specific Description</label>
            <textarea className={styles.textarea} name='item_description'
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, item_description: e.target.value
              }))}></textarea>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Specific Location</label>
            <input type="text" className={styles.input} name='location_description'
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, location_description: e.target.value
              }))} />
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Remarks (if any)</label>
            <textarea className={styles.textarea} name='additional_remarks'
              onChange={(e) => setFormData((prevData) => ({
                ...prevData, additional_remarks: e.target.value
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
                name='tags'
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
                tagsList.map((tag: any, index: any) => (
                  <div key={index} className={styles.tagsList}>
                    <p>{tag}</p>
                    <p onClick={() => removeTag(tag)}>X</p>
                  </div>
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
              {previewImages && previewImages.length > 0  ?  previewImages.map((previewImage: any,index:number) => (
                <div className='flex flex-wrap' key={index}>
                  <div className={styles.imageWrapper}>
                    <Image src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${previewImage}`} alt="Preview" className={styles.image} width={100} height={100} />
                  </div>
                </div>
              )): (
              <div className='flex flex-wrap '>
                <div className={styles.imageWrapper}>
                  <Image src={placeholderImg} alt="Preview" className={styles.image} width={100} height={100} />
                </div>
              <div className={styles.imageWrapper}>
                <Image src={placeholderImg} alt="Preview" className={styles.image} width={100} height={100} />
              </div>
              </div>)}
              
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ReportFound;
