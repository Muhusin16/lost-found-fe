'use client'
import { apiUrls } from '@/app/config/api.config'
import axiosInstance from '@/app/services/axiosInterceptor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminTool = () => {

    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');

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

    const handleInputChangeCategory = (e: any) => {
        setNewCategory(e.target.value);
    }

    const handleInputChangeSubCategory = (e: any) => {
        setNewSubCategory(e.target.value);
    }

    const addCategory = async () => {
        try {
            const response = await axiosInstance.post(`${apiUrls.categories}`,
                { name: newCategory });
            setNewCategory('')
        } catch (error) {
            console.log(error)
        }
    }

    const addSubCategory = async (category:any) => {
        try {
        const subCategory = category.sub_categories;     
        const updatedSubCategory = [...subCategory, { id: subCategory.length+1, name:newSubCategory}]
        
        const response = await axiosInstance.put(`${apiUrls.categories}/${category._id}`, {sub_categories: updatedSubCategory})
        console.log(response.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getCategories();
        addCategory();
    }, [])

    return (
        <>
            <div>
                <input onChange={handleInputChangeCategory} type="text" className='bg-gray-200' />
                <button onClick={() => addCategory()}>Add Category</button>
            </div>
            <div>
                {category && category.map((each: any) => (<div>
                    <h1>{each.name}</h1>
                    <div>
                        <input onChange={handleInputChangeSubCategory} type="text" className='bg-gray-200' />
                        <button onClick={() => addSubCategory(each)}>Add Sub Category</button>
                    </div>
                    {each.sub_categories.map((subCategory: any) =>
                        <li>{subCategory.name}</li>)}
                </div>
                ))}
            </div>

        </>
    )
}

export default AdminTool