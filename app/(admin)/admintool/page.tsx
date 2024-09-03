'use client'
import { apiUrls } from '@/app/config/api.config'
import axiosInstance from '@/app/services/axiosInterceptor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminTool = () => {

    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const getCategories = async () => {
        console.log('categories')
        try {
            const response = await axiosInstance.get(`${apiUrls.categories}`)
            console.log(response.data)
            setCategory(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e: any) => {
        setNewCategory(e.target.value);
    }

    const addCategory = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiUrls.categories}`,
                { name: newCategory },
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the correct content type is set
                    },
                });
                setNewCategory('');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories();
        addCategory();
    }, [])

    return (
        <>
            <div>
                <input onChange={handleInputChange} type="text" className='bg-gray-200' />
                <button onClick={() => addCategory()}>Add Category</button>
            </div>
            <div>
                {category && category.map((each: any) => (<div>
                    <h1>{each.name}</h1>
                    {each.sub_categories.map((subCategory: any) =>
                        <li>{subCategory.name}</li>)}
                </div>))}
            </div>

        </>
    )
}

export default AdminTool