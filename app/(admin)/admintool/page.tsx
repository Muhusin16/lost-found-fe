'use client'
import { apiUrls } from '@/app/config/api.config'
import axiosInstance from '@/app/services/axiosInterceptor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'

const AdminTool = () => {

    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const role = useSelector((state:RootState) => state.role.role)
   
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
            setNewCategory('');
            getCategories();
        } catch (error) {
            console.log(error)
        }
    }

    const addSubCategory = async (category: any) => {
        try {
            const subCategory = category.sub_categories;
            const updatedSubCategory = [...subCategory, { id: subCategory.length + 1, name: newSubCategory }]

            const response = await axiosInstance.put(`${apiUrls.categories}/${category._id}`, { sub_categories: updatedSubCategory })
            console.log(response.data)
            getCategories();
            setNewSubCategory('')
        } catch (error) {
            console.log(error);

        }
    }
    const [open, setOpen] = React.useState(null);
    // const handleOpen = (value: any) => setOpen(open === value ? value : 0);

    const toggleAccordion = (value: any) => {
        setOpen(open === value ? null : value);
    };

    useEffect(() => {
        getCategories();
        addCategory();
    }, [])

    return (
        <>
            <div>
                <input className="bg-gray-200 p-2 border border-gray-300 rounded-md" value={newCategory} onChange={handleInputChangeCategory} type="text" />
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => addCategory()}>Add Category</button>
            </div>
            {
                category && category.map((each: any, index:any) => (
                    <Accordion key={index} open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <AccordionHeader onClick={() => toggleAccordion(index)} placeholder={undefined} onPointerLeaveCapture={undefined} onPointerEnterCapture={undefined}>{each.name}</AccordionHeader>
                        <AccordionBody>
                        <div>
                        <input className="bg-gray-200 p-1 border border-gray-300 rounded-md" value={newSubCategory} onChange={handleInputChangeSubCategory} type="text" />
                        <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => addSubCategory(each)}>Add Sub Category</button>
                    </div>
                            {
                                each.sub_categories.map((subCategory:any) => (
                                    <p className='my-1 text-lg'>{subCategory.name}</p>
                                ))
                            }
                        </AccordionBody>
                    </Accordion>
                ))
            }

        </>
    )
}

export default AdminTool