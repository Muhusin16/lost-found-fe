import React from 'react';
import image1 from '../../../../public/paper-bag.svg'
import image2 from '../../../../public/paper-bag.svg'
import image3 from '../../../assets/335c.jpg'
import image4 from '../../../assets/335d.jpg'
import image5 from '../../../assets/335e.jpg'
import image6 from '../../../assets/335f.jpg'
import image7 from '../../../assets/335g.jpg'
import styles from './productId.module.scss'


import Image from 'next/image';

const page = () => {
    const imageCollection = [image1, image1, image1, image1];

    return (
        <>
            <div className="" >
                <div className="flex">
                    <div className="flex-1">
                        <div className={styles.productsSection }>
                            {
                                imageCollection.map((item, index) => (
                                    <div className='' key={index}>
                                        <Image src={item} alt="Image 1" className="w-full h-auto" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-100">
                        <div className='m-5'>
                            <h4>Product Info</h4>
                            <hr className={styles.hrStyle} />
                            <div  className={`${styles.prodDetail} my-5`}>
                                <p className='mb-3'><span>Name: </span>iPhone 15 Pro</p>
                                <p className='mb-3'><span>Qualtity: </span>10</p>
                                <p className='mb-3'><span>Color: </span>Black</p>
                                <p className='mb-3'><span>Description: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d</p>
                                <p className=''><span>Date Updated: </span>24 Aug 2024</p>
                            </div>

                            <h4>Product Detail</h4>
                            <hr className={styles.hrStyle}/>
                            <div className={`${styles.prodDetail} mt-5`}>
                                <p className='mb-3'><span>Category: </span>Electronic</p>
                                <p className='mb-3'><span>Sub-category: </span>Phone</p>
                                <p className='mb-3'><span>Brand: </span>iPhone Pro Max</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page