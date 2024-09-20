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

    const [allCategory, setAllCategory] = useState([])
    const [category, setCategory] = useState({ name: '', description: '' });
    const [subCategory, setSubCategory] = useState({ name: '', description: '' });
    const [activeTab, setActiveTab] = useState('MANAGE_ADMINS');
    const role = useSelector((state: RootState) => state.role.role)

    const getCategories = async () => {
        console.log('categories')
        try {
            const response = await axiosInstance.get(`${apiUrls.categories}`)
            console.log(response.data)
            setAllCategory(response.data.reverse());
        } catch (error) {
            console.log(error)
        }
    }

    const addNewCategory = async () => {
        const payload = {
            name: category.name,
            description: category.description
        }
        try {
            const response = await axiosInstance.post(`${apiUrls.categories}`, payload)
            console.log('New category added..........', response.data);
            setCategory({ name: '', description: '' });
            getCategories();

        } catch (error) {

        }
    }



    const addNewSubcategory = async (cat: any) => {
        console.log(cat);
        console.log(cat.sub_categories);
        try {
            const getSubCategory = cat.sub_categories;

            const updatedSubCategory = [...getSubCategory, { name: subCategory.name, description: subCategory.description }]
            const payload = { sub_categories: updatedSubCategory }
            const response = await axiosInstance.put(`${apiUrls.categories}/${cat._id}`,
                payload,
            )
            setSubCategory({ name: '', description: '' })
            getCategories();
        } catch (error) {
            console.log(error);

        }

    }

    const handleDeleteCategory = async (cat: any) => {
        try {
            const response = await axiosInstance.delete(`${apiUrls.categories}/${cat}`);
            alert('Category deleted succesfully!!!')
            getCategories();
        } catch (error) {
            console.log(error);

        }
    }

    const [open, setOpen] = React.useState(null);

    const toggleAccordion = (value: any) => {
        setOpen(open === value ? null : value);
    };

    const handleTabsClick = (tab: string) => {
        setActiveTab(tab);
    }

    useEffect(() => {
        getCategories();
    }, []);

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
                    <div className="w-2/3 min-h-screen">
                <div className="flex items-center justify-between mb-4 bg-white p-4 shadow-md rounded-md">
                    <div className="flex space-x-4">
                        <input
                            className="bg-gray-200 p-2 border border-gray-300 rounded-md w-64"
                            value={category.name}
                            onChange={(e) => setCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                            placeholder="Category Name"
                            type="text"
                        />
                        <input
                            className="bg-gray-200 p-2 border border-gray-300 rounded-md w-64"
                            value={category.description}
                            onChange={(e) => setCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                            placeholder="Category Description"
                            type="text"
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={addNewCategory}
                    >
                        Add Category
                    </button>
                </div>
                {allCategory &&
                    allCategory.map((each: any, index: any) => (
                        <div key={index} className="bg-blue-50 shadow-md rounded-md px-2 mb-4">


                            <Accordion open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <AccordionHeader onClick={() => toggleAccordion(index)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-xl font-semibold">{each.name}</p>
                                        <div className="space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white p-1 px-2 rounded-md hover:bg-yellow-600 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-1 px-2 rounded-md hover:bg-red-600 transition-colors"
                                                onClick={() => handleDeleteCategory(each._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </AccordionHeader>
                                <AccordionBody className="bg-blue-100 rounded-md p-3">
                                    <div className="space-y-2">
                                        <div className="bg-blue-50 p-4 rounded-md border border-gray-300 my-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Description:
                                            </label>
                                            <p className="text-base text-gray-800">
                                                {each.description}
                                            </p>
                                        </div>

                                        <div className="flex space-x-4">
                                            <input
                                                className="bg-gray-200 p-2 border border-gray-300 rounded-md w-64"
                                                value={subCategory.name}
                                                onChange={(e) => setSubCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                                                placeholder="Subcategory Name"
                                                type="text"
                                            />
                                            <input
                                                className="bg-gray-200 p-2 border border-gray-300 rounded-md w-64"
                                                value={subCategory.description}
                                                onChange={(e) => setSubCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                                                placeholder="Subcategory Description"
                                                type="text"
                                            />
                                            <button
                                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                                                onClick={() => addNewSubcategory(each)}
                                            >
                                                Add Subcategory
                                            </button>
                                        </div>

                                        {each.sub_categories.map((subCategory: any) => (
                                            <div key={subCategory.name} className="border-t border-gray-300 pt-4 flex items-center justify-between">
                                                {/* Subcategory Name and Description */}
                                                <div className='flex gap-10 items-center justify-start'>
                                                    <p className="text-lg font-semibold text-gray-800">{subCategory.name}</p>
                                                    <p className="text-sm text-gray-500">{subCategory.description}</p>
                                                </div>

                                                {/* Edit and Delete Buttons */}
                                                <div className="space-x-2">
                                                    <button
                                                        className="bg-yellow-500 text-white p-1 px-2 rounded-md hover:bg-yellow-600 transition-colors"

                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white p-1 px-2 rounded-md hover:bg-red-600 transition-colors"

                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </AccordionBody>
                            </Accordion>
                        </div>
                    ))}
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