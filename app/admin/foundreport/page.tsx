"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './FoundReport.module.scss';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface FormData {
  itemType: OptionType | null;
  brand: string;
  color: string;
  size: string;
  material: string;
  condition: OptionType | null;
  dateFoundLost: string;
  location: string;
  uniqueIdentifiers: string;
  barcode: string;
  tags: string;
  description: string;
  ownerName: string;
  contactInfo: string;
  image: File | null;
}

const itemTypeOptions: OptionType[] = [
  { value: 'bag', label: 'Bag' },
  { value: 'electronic', label: 'Electronic Device' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'document', label: 'Document' },
  { value: 'other', label: 'Other' },
];

const conditionOptions: OptionType[] = [
  { value: 'new', label: 'New' },
  { value: 'worn', label: 'Worn' },
  { value: 'damaged', label: 'Damaged' },
];

const steps = [
  'Item Details',
  'Additional Info',
  'Description & Contact',
  'Upload Image'
];

const FoundReport: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    itemType: null,
    brand: '',
    color: '',
    size: '',
    material: '',
    condition: null,
    dateFoundLost: '',
    location: '',
    uniqueIdentifiers: '',
    barcode: '',
    tags: '',
    description: '',
    ownerName: '',
    contactInfo: '',
    image: null,
  });

  const handleChange = (selectedOption: OptionType | null, actionMeta: any) => {
    const { name } = actionMeta;
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Handle form submission logic
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formHeading}>{steps[currentStep]}</h2>

      {/* Step 1: Item Details */}
      {currentStep === 0 && (
        <>
          <div className="mb-4">
            <label className={styles.labelField} htmlFor="itemType">
              Item Type
            </label>
            <Select
              id="itemType"
              name="itemType"
              options={itemTypeOptions}
              value={formData.itemType}
              onChange={handleChange}
              classNamePrefix="select"
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="brand">
              Brand/Manufacturer
            </label>
            <input
              type="text"
              id="brand"
              className={styles.inputField}
              placeholder="Enter the brand or manufacturer"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="color">
              Color
            </label>
            <input
              type="text"
              id="color"
              className={styles.inputField}
              placeholder="Enter the color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="size">
              Size
            </label>
            <input
              type="text"
              id="size"
              className={styles.inputField}
              placeholder="Enter the size or dimensions"
              value={formData.size}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="material">
              Material
            </label>
            <input
              type="text"
              id="material"
              className={styles.inputField}
              placeholder="Enter the material"
              value={formData.material}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="condition">
              Condition
            </label>
            <Select
              id="condition"
              name="condition"
              options={conditionOptions}
              value={formData.condition}
              onChange={handleChange}
              classNamePrefix="select"
            />
          </div>
        </>
      )}

      {/* Step 2: Additional Info */}
      {currentStep === 1 && (
        <>
          <div className="mb-4">
            <label className={styles.labelField} htmlFor="dateFoundLost">
              Date Found/Lost
            </label>
            <input
              type="date"
              id="dateFoundLost"
              className={styles.inputField}
              value={formData.dateFoundLost}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="location">
              Location Found/Lost
            </label>
            <input
              type="text"
              id="location"
              className={styles.inputField}
              placeholder="Enter the location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="uniqueIdentifiers">
              Unique Identifiers
            </label>
            <input
              type="text"
              id="uniqueIdentifiers"
              className={styles.inputField}
              placeholder="Enter any unique identifiers"
              value={formData.uniqueIdentifiers}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="barcode">
              Barcode Information
            </label>
            <input
              type="text"
              id="barcode"
              className={styles.inputField}
              placeholder="Enter barcode information"
              value={formData.barcode}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="tags">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              className={styles.inputField}
              placeholder="Enter tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}

      {/* Step 3: Description & Contact */}
      {currentStep === 2 && (
        <>
          <div className="mb-4">
            <label className={styles.labelField} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className={styles.textareaField}
              placeholder="Provide a detailed description of the item"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="ownerName">
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              className={styles.inputField}
              placeholder="Enter the owner's name"
              value={formData.ownerName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className={styles.labelField} htmlFor="contactInfo">
              Contact Info
            </label>
            <input
              type="text"
              id="contactInfo"
              className={styles.inputField}
              placeholder="Enter contact information"
              value={formData.contactInfo}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}

      {/* Step 4: Upload Image */}
      {currentStep === 3 && (
        <div className="mb-4">
          <label className={styles.labelField} htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className={styles.inputField}
            onChange={handleFileChange}
          />
        </div>
      )}

      <div className={styles.buttonContainer}>
        {currentStep > 0 && (
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className={styles.submitButton}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default FoundReport;
