'use client';
import { useState } from 'react';
import styles from './reportfound.module.scss';

const ReportFound = () => {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <div className={`${styles.reportFound} ${styles.container}`}>
      <h2 className={styles.heading}>Report Found Product</h2>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Item Name*</label>
              <input type="text" className={styles.input} />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Date Item Lost*</label>
              <input type="date" className={styles.input} />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Category</label>
              <select className={styles.input}>
                <option>Select...</option>
              </select>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Sub Category</label>
              <select className={styles.input}>
                <option>Select...</option>
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Brand</label>
              <select className={styles.input}>
                <option>Select...</option>
              </select>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>New Category (if any)</label>
              <input type="text" className={styles.input} />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Primary Color</label>
              <select className={styles.input}>
                <option>Select...</option>
              </select>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>Secondary Color</label>
              <select className={styles.input}>
                <option>Select...</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col'>
            <div>
              <label className={styles.label}>Image upload</label>
              <p className={styles.imagesDescription}>Pictures paint a thousand words! Please upload a picture for your listing. You can upload up to 4 pictures. The first will be your primary for your listing. Image Size should not me more than 2 MB.</p>
            </div>
            <div className={styles.formItem}>
              <input type="file" className={styles.input} />
            </div>
          </div>

          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" name="itemType" value="non-consumable" />{" "}
              Non-Consumable
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="itemType" value="consumable" />{" "}
              Consumable
            </label>
          </div>

          <div className={styles.grid}>
            <div className={styles.formItem}>
              <label className={styles.label}>Model no. / serial no. / lid no.</label>
              <input type="text" className={styles.input} />
            </div>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Specific Description</label>
            <textarea className={styles.textarea}></textarea>
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Specific Location</label>
            <input type="text" className={styles.input} />
          </div>

          <div className={styles.formItem}>
            <label className={styles.label}>Remarks (if any)</label>
            <textarea className={styles.textarea}></textarea>
          </div>
          <button type='button' className={styles.saveButton}>Save & close</button>
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
                onClick={() => console.log('Add Tag:', selectedTag)}
              >
                Add Tag
              </button>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imagePreview}>
              <label className={styles.label}>Image Preview</label>
              <div className='flex flex-wrap '>
              <div className={styles.imageWrapper}>
                <img src="/placeholder-image.png" alt="Preview" className={styles.image} />
              </div>
              {/* <button className={styles.deleteButton}>Delete</button> */}
            </div>
            <div className={styles.imageWrapper}>
              <img src="/placeholder-image.png" alt="Preview" className={styles.image} />
              {/* <button className={styles.deleteButton}>Delete</button> */}
            </div>
              </div>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default ReportFound;
