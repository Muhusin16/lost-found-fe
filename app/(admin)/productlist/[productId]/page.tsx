"use client";
import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../../../public/paper-bag.svg";
import styles from "./productId.module.scss";
import { apiUrls } from "@/app/config/api.config";
import axiosInstance from "@/app/services/axiosInterceptor";
import Image from "next/image"; // Use Next.js Image component
import placeholderImage from "../../../assets/placeholder-img.jpg";

const ProductId = ({ params }: any) => {
  // Extract productId from the params
  const { productId } = params;

  const [product, setProduct] = useState<any>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Fetch product data based on ID
  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrls.getProductById}/${productId}`);
      console.log(response);
      setProduct(response.data.data);
      setImageUrls(response.data.data.image_urls || []); // Set the image URLs
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Update product data
  const updateProduct = async () => {
    try {
      const updatedData = {
        item_name: product.item_name, // Example update
        item_lost_date: product.item_lost_date, // Example update
        item_type: product.item_type,
        model_number: product.model_number,
        serial_number: product.serial_number,
        primary_color: product.primary_color,
        secondary_color: product.secondary_color,
        category: product.category,
        sub_category: product.sub_category,
        brand: product.brand,
        item_description: product.item_description,
        location_description: product.location_description,
        additional_remarks: product.additional_remarks,
        image_urls: imageUrls, // Assuming you want to keep the uploaded images
        tags: product.tags,
        storage_info: product.storage_info,
        retention_period_days: product.retention_period_days,
      };

      const response = await axiosInstance.put(`${apiUrls.updateProductById}/${productId}`, updatedData);
      alert("Product updated successfully!");
      fetchProductData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete the product
  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`${apiUrls.deleteProductById}/${productId}`);
      alert("Product deleted successfully!");
      // Redirect or update the UI accordingly
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return (
    <div className={styles.productListMain}>
      <div className="flex max-w-fit mx-6">
        <div className="flex-1">
          <div className={styles.productsSection}>
            <div className="">
              {imageUrls.length > 0 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${imageUrls[0]}`} // Concatenate the Firestore base URL with the image path
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="w-full h-auto"
                />
              ) : (
                <Image
                  src={placeholderImage} // Placeholder image
                  alt="Placeholder Image"
                  width={100}
                  height={100}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
          <div className="flex gap-10 mt-10">
            {imageUrls.map((image: string, index: number) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${image}`} // Use Firestore base URL for each image
                alt={`Product Image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-100">
        <div className="m-5">
          <h4 className={styles.heading}>Product Info</h4>
          <div className={`${styles.prodDetail} my-5`}>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Item Name: </span>
              </p>
              <p>{product.item_name}</p>
            </div>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Item Lost Date: </span>
              </p>
              <p>{product.item_lost_date}</p>
            </div>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Specific Description: </span>
              </p>
              <p>{product.item_description}</p>
            </div>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Specific Location: </span>
              </p>
              <p>{product.location_description}</p>
            </div>
          </div>

          <h4 className={`${styles.heading} mt-10`}>Product Details</h4>
          <div className={`${styles.prodDetail} mt-5`}>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Category: </span>
              </p>
              <p>{product.category}</p>
            </div>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Sub-category: </span>
              </p>
              <p>{product.sub_category}</p>
            </div>
            <div className="flex justify-start">
              <p className="mb-3 w-1/2">
                <span>Primary Color: </span>
              </p>
              <p>{product.primary_color}</p>
            </div>
          </div>

          <h4 className={`${styles.heading} mt-10`}>Additional Remarks</h4>
          <div className={`${styles.prodDetail} mt-5`}>
            <p className="mb-3">{product.additional_remarks}</p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              type="button"
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded"
              onClick={updateProduct}
            >
              Update Product
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-700 text-white font-semibold rounded"
              onClick={deleteProduct}
            >
              Delete Product
            </button>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded"
              onClick={updateProduct}
            >
              Claim your Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductId;
