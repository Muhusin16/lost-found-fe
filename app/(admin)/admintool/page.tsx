'use client'
import { apiUrls } from '@/app/config/api.config'
import axiosInstance from '@/app/services/axiosInterceptor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Input,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'

const AdminTool = () => {

    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [activeTab, setActiveTab] = useState('MANAGE_ADMINS');
    const role = useSelector((state: RootState) => state.role.role)

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
            const updatedSubCategory = [...subCategory, { name: newSubCategory }]

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

    const handleTabsClick = (tab: string) => {
        setActiveTab(tab);
    }

    useEffect(() => {
        getCategories();
        addCategory();
    }, [])

    return (
        <div className='flex'>
            <div className='w-1/6 bg-gray-200 h-[calc(100vh-72px)] px-3 fixed top-[72px] left-0'>
                <p className={`p-3 mt-6 font-semibold text-blue-800 ${activeTab === 'MANAGE_ADMINS' ? 'bg-gray-400' : ''}`}>
                    <button className="w-full text-left" onClick={() => handleTabsClick('MANAGE_ADMINS')}>Manage Admins</button>
                </p>
                <p className={`p-3 font-semibold text-blue-800 ${activeTab === 'MANAGE_CATEGORIES' ? 'bg-gray-400' : ''}`}>
                    <button className="w-full text-left" onClick={() => handleTabsClick('MANAGE_CATEGORIES')}>Manage Categories</button>
                </p>
                <p className={`p-3 font-semibold text-blue-800 ${activeTab === 'MANAGE_RETENTION_PERIODS' ? 'bg-gray-400' : ''}`}>
                    <button className="w-full text-left" onClick={() => handleTabsClick('MANAGE_RETENTION_PERIODS')}>Manage Retention Periods</button></p>
                <p className={`p-3 font-semibold text-blue-800 ${activeTab === 'MANAGE_TOOLS' ? 'bg-gray-400' : ''}`}>
                    <button className="w-full text-left" onClick={() => handleTabsClick('MANAGE_TOOLS')}>Manage Tools</button>
                </p>
            </div>
            <div className='w-5/6 ml-[16.66%] h-auto px-3 overflow-y-auto'>
                {/* Manage Admins */}
                {activeTab === 'MANAGE_ADMINS' &&
                    <div>
                        <h3>Manage Admins</h3>
                        <form className='w-4/6'>
                                <div className="form-container">
                                    <label htmlFor="user_name">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-container">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone_number">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                                        Address
                                    </label>
                                    <textarea 
                                        rows={4}
                                        id="address"
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div> 
                                <button
                                    type="button"
                                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Add Admin/Super Admin
                                </button>
                            </form>
                    </div>
                }

                {/* Manage Categories */}
                {
                    activeTab === 'MANAGE_CATEGORIES' &&
                    <div>
                        <div>
                            <h3 className='mb-5'> Manage Categories</h3>
                            <input className="bg-gray-200 p-2 border border-gray-300 rounded-md" value={newCategory} onChange={handleInputChangeCategory} type="text" />
                            <Input onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label='N'/>
                            <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => addCategory()}>Add Category</button>
                        </div>
                        {
                            category && category.map((each: any, index: any) => (
                                <Accordion key={index} open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <AccordionHeader onClick={() => toggleAccordion(index)} placeholder={undefined} onPointerLeaveCapture={undefined} onPointerEnterCapture={undefined}>{each.name}</AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <input className="bg-gray-200 p-1 border border-gray-300 rounded-md" value={newSubCategory} onChange={handleInputChangeSubCategory} type="text" />
                                            <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => addSubCategory(each)}>Add Sub Category</button>
                                        </div>
                                        {
                                            each.sub_categories.map((subCategory: any) => (
                                                <p className='my-1 text-lg'>{subCategory.name}</p>
                                            ))
                                        }
                                    </AccordionBody>
                                </Accordion>
                            ))
                        }
                    </div>
                }

                {activeTab === 'MANAGE_RETENTION_PERIODS' &&
                    <div>
                        <h3>Manage Retention Periods</h3>
                    </div>
                }

                {activeTab === 'MANAGE_TOOLS' &&
                    <div>
                        <h3>Manage Tools</h3>
                    </div>
                }
            </div>


        </div>
    )
}

export default AdminTool