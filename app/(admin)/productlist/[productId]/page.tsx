"use client"
import React, { useEffect, useState } from 'react';
import image1 from '../../../../public/paper-bag.svg'
import image2 from '../../../../public/paper-bag.svg'
import image3 from '../../../assets/335c.jpg'
import image4 from '../../../assets/335d.jpg'
import image5 from '../../../assets/335e.jpg'
import image6 from '../../../assets/335f.jpg'
import image7 from '../../../assets/335g.jpg'
import styles from './productId.module.scss'
import { initialProducts } from '../../../config/data.config'


import Image from 'next/image';
import axios from 'axios';
import { apiUrls } from '@/app/config/api.config';
// import { useRouter } from 'next/';
const ProductId = ({ params }: any) => {

    // const router = useRouter();
    // const { pId} = router.query;
    const productId = params.productId;
    console.log(productId);
    // 
    const imageCollection = [image1, image1, image1, image1];
    const [showForm, setShowForm] = useState(false);
    const [product, setProduct] = useState<any>({});
    const [prodImage, setProdImage] = useState(image3);
    const [imageUrls, setImageUrls] = useState([]);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrls.products}/${productId}`);
            console.log('Product Data...........', response.data);
            setProduct(response.data);
            setImageUrls(response.data.imageUrl);

        } catch (error) {
            console.log(error);
        }
    }

    const getImageUrl = (title: any) => {

        const imageUrl = initialProducts?.filter((product: any) => product.title?.toLowerCase().includes(title?.toLowerCase()))

        if (imageUrl.length > 0) {
            return imageUrl[0]?.image;
        } else {
            return "/shopping-bags.svg"
        }
    }

        useEffect(() => {
            fetchProductData();
        }, []);

        return (
            <>
                <div className={styles.productListMain} >


                    <div className="flex">
                        <div className="flex-1">
                            <div className={styles.productsSection}>
                                <div className='' >
                                   { imageUrls && imageUrls.length > 0 &&
                                     <img src={imageUrls[1]} width={100} height={100} alt="Image 1" className="w-full h-auto" />
                                   }
                                </div>
                            </div>
                            <div className='flex gap-10 mt-10'>
                            {product?.imageUrl && product?.imageUrl.map((image:any) => (

                            <img src={image} width={100} height={100} alt="Image 1" className="w-full h-auto" />
                            )) }
                    
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-100">
                            <div className='m-5'>
                                <h4 className={styles.heading}>Product Info</h4>
                                <div className={`${styles.prodDetail} my-5`}>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Item Name: </span></p>
                                        <p>{product.title}</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Item Lost Date: </span></p>
                                        <p>{product.dateLost}</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Item Worth: </span></p>
                                        <p>INR 1.5 Lakhs</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Quantity: </span></p>
                                        <p className='mb-3'>10</p>
                                    </div>

                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Specific Description: </span></p>
                                        <p className='mb-3 w-1/2'>{product.specificDescription
                                        }</p>
                                    </div>

                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Specific Location: </span></p>
                                        <p className='mb-3'>{product.specificLocation}</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='w-1/2'><span>Date Updated: </span></p>
                                        <p>24 Aug 2024</p>
                                    </div>

                                </div>
                                <h4 className={`${styles.heading} mt-10`}>Product Detail</h4>
                                <div className={`${styles.prodDetail} mt-5`}>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Category: </span></p>
                                        <p className='mb-3'>Electronic</p>
                                    </div>

                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Sub-category: </span></p>
                                        <p className='mb-3'>{product.subCategory}</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Brand Name: </span></p>
                                        <p className='mb-3'>{product.brand}</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Item S/No. or Modal No.: </span></p>
                                        <p>ES5100X0</p>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Primary Color: </span></p>
                                        <p className='mb-3'>{product.primaryColor}</p>
                                    </div>

                                    <div className='flex justify-start'>
                                        <p className='mb-3 w-1/2'><span>Secondary Color: </span></p>
                                        <p className='mb-3'>{product.
                                            secondaryColor}</p>
                                    </div>

                                </div>
                                <h4 className={`${styles.heading} mt-10`}>Additional Remarks</h4>
                                <div className={`${styles.prodDetail} mt-5`}>
                                    <p className='mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet aliquam dui. Fusce scelerisque viverra tristique. Nam dolor massa, pharetra ut suscipit id, vehicula nec dui. Morbi vel diam porta. Fusce scelerisque viverra tristique. Nam dolor massa, pharetra ut suscipit id, vehicula nec dui. Morbi vel diam porta, elementum lacus quis, e
                                        <br />
                                        <br />
                                        Elementum ex. Phasellus ut augue purus. Vestibulum nec fringilla eros. Cras et sapien sed odio fringilla molestie quis sit amet eros. Ut volutpat faucibus dui non aliquam. Praesent vel urna vitae enim auctor porta. Proin pellentesque dui a tellus varius convallis. Quisque mi mi, porttitor non nibh et, commodo vulputate neque. </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="flex ms-auto me-6 my-10 px-4 py-2 bg-red-700 text-white font-semibold rounded"
                                onClick={() => setShowForm(true)}
                            >
                                Claim your Property
                            </button>
                        </div>

                    </div>


                    <div>
                        {
                            showForm && <div className={styles.userForm}>
                                <div className=' bg-gray-300 p-10 '>
                                    <h2>User Information Form</h2>
                                    <form action="/submit-form" method="post" className='flex justify-between'>
                                        <div>
                                            <label htmlFor="name">Title:</label><br />
                                            <input placeholder='Mr/Miss/Mrs' className='p-1' type="text" id="name" name="name" required /><br /><br />

                                            <label htmlFor="name">Full Name:</label><br />
                                            <input className='p-1' type="text" id="name" name="name" required /><br /><br />

                                            <label htmlFor="address">Email:</label><br />
                                            <input className='p-1' type="text" id="address" name="address" required /><br /><br />

                                            <label htmlFor="phoneNumber">Phone Number:</label><br />
                                            <input className='p-1' type="tel" id="phoneNumber" name="phoneNumber" required /><br /><br />

                                            <label htmlFor="idCard">Upload ID Card:</label><br />
                                            <input className='p-1' type="text" id="idCard" name="idCard" required /><br /><br />

                                            <button type="button" onClick={() => setShowForm(false)} className="flex my-10 px-4 py-2 bg-red-700 text-white font-semibold rounded">
                                                Cancel
                                            </button>
                                        </div>

                                        <div>
                                            <label htmlFor="location">Address</label><br />
                                            <input className='p-1' type="text" id="location" name="location" required /><br /><br />

                                            <label htmlFor="city">City:</label><br />
                                            <input className='p-1' type="text" id="city" name="city" required /><br /><br />

                                            <label htmlFor="country">State:</label><br />
                                            <input className='p-1' type="text" id="country" name="country" required /><br /><br />

                                            <label htmlFor="email">Pincode:</label><br />
                                            <input className='p-1' type="email" id="email" name="email" required /><br /><br />

                                            <label htmlFor="email">Location:</label><br />
                                            <input className='p-1' type="email" id="email" name="email" required /><br /><br />

                                            <input onClick={() => setShowForm(false)} className="flex my-10 px-4 py-2 bg-gray-700 text-white font-semibold rounded" type="submit" value="Submit" />

                                        </div>


                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </>
        )
    }

    export default ProductId