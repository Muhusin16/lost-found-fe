'use client'
import { apiUrls } from '@/app/config/api.config'
import axiosInstance from '@/app/services/axiosInterceptor'
import { FaEdit, FaRegWindowClose, FaRegEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from 'react';
import placeholderimg from '../../assets/placeholder-img.jpg'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import Image from 'next/image';
import { formatDate } from '@/app/services/coreServices';

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Admin", "City", "Phone Number", "Status", "Created At", ""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];

const initialAdminFormData = {
    full_name: '',
    user_name: '',
    title: 'MR',
    role: 'admin',
    phone_number: '',
    date_of_birth: '',
    address: "",
    pincode: '',
    city: '',
    state: '',
    gender: '',
    profile_pic: ''
}
const AdminTool = () => {

    const [allCategory, setAllCategory] = useState([])
    const [category, setCategory] = useState({ name: '', description: '' });
    const [subCategory, setSubCategory] = useState({ open: false, id: '', name: '', description: '' });
    const [activeTab, setActiveTab] = useState('MANAGE_ADMINS');
    const [updateCategory, setUpdateCategory] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [open, setOpen] = React.useState(null);
    const [allAdmins, setAllAdmins] = useState([])
    const [profilePicturePreview, setProfilePicturePreview] = useState<any>([]);

    const [addOrEditAdmin, setAddOrEditAdmin] = useState({openForm:false,mode:'add'});
    const [addNewAdminOrEditFormData, setAddNewAdminOrEditFormData] = useState<any>(initialAdminFormData);
    const role = useSelector((state: RootState) => state.role.role)

    const getCategories = async () => {
        try {
            const response = await axiosInstance.get(`${apiUrls.categories}`)
            if (response.data.success) {
                setAllCategory(response.data.data.reverse());
            }
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
            setCategory({ name: '', description: '' });
            getCategories();
            setOpen(null);
        } catch (error) {
            console.log(error);
        }
    }



    const addNewSubcategory = async (cat: any) => {
        try {
            const getSubCategory = cat.sub_categories;

            const updatedSubCategory = [...getSubCategory, { name: subCategory.name, description: subCategory.description }]
            const payload = { sub_categories: updatedSubCategory }
            const response = await axiosInstance.put(`${apiUrls.categories}/${cat._id}`,
                payload,
            )
            setSubCategory({ open: false, id: '', name: '', description: '' })
            getCategories();
        } catch (error) {
            console.log(error);

        }

    }

    const handleDeleteCategory = async (cat: any) => {
        try {
            var result = confirm('Are you sure you want to delete?');
            if (result) {
                const response = await axiosInstance.delete(`${apiUrls.categories}/${cat}`);
                alert('Deleted succesfully!!!')
            }

            getCategories();
            setOpen(null);
        } catch (error) {
            console.log(error);

        }
    }

    const handleDeleteSubCategory = async (cat: any, subCategoryId: any) => {
        const subCategories = cat.sub_categories;
        var result = confirm('Are you sure you want to delete?')
        if (result) {
            const updatedSubCategoryAfterDelete = subCategories.filter((subCategory: any) => subCategory._id != subCategoryId);
            const payload = { sub_categories: updatedSubCategoryAfterDelete }
            const response = await axiosInstance.put(`${apiUrls.categories}/${cat._id}`,
                payload
            );

            getCategories();
        }

    }

    const handleUpdateCategory = async (category: any) => {
        setUpdateCategory(true)
        setCategoryId(category._id)
        setCategory({ name: category.name, description: category.description })

    }

    const updateSelectedCategory = async () => {

        try {
            const payload = { name: category.name, description: category.description }
            const response = await axiosInstance.put(`${apiUrls.categories}/${categoryId}`,
                payload
            );
            setCategory({ name: '', description: '' });
            setCategoryId('');
            setUpdateCategory(false);
            alert('category Updated succesfully!!')
            getCategories();
            setOpen(null);
        } catch (error) {
            console.log(error);

        }
    }

    const closeUpdateCategory = () => {
        setCategory({ name: '', description: '' });
        setCategoryId('');
        setUpdateCategory(false);
        setOpen(null);
    }

    const handleUpdateSubCategory = async (subCategory: any) => {
        setSubCategory({ open: true, id: subCategory._id, name: subCategory.name, description: subCategory.description });

    }

    const updateSubcategory = async (category: any) => {
        try {
            const subCategories = category.sub_categories;
            const subCategoriesToUpdate = subCategories.find((subCat: any) => subCat._id == subCategory.id)
            const filteredSubCategory = subCategories.filter((subCat: any) => subCat._id != subCategory.id)
            const updatedSubCategory = [...filteredSubCategory, { ...subCategoriesToUpdate, name: subCategory.name, description: subCategory.description }]
            const payload = { sub_categories: updatedSubCategory }

            const response = await axiosInstance.put(`${apiUrls.categories}/${category._id}`,
                payload
            );
            setSubCategory({ open: false, id: '', name: '', description: '' });
            getCategories();
        } catch (error) {

        }
    }


    const toggleAccordion = (value: any) => {
        setOpen(open === value ? null : value);
    };

    const handleTabsClick = (tab: string) => {
        setActiveTab(tab);
    }

    const getAllAdmins = async () => {
        try {
            const response = await axiosInstance.get(`${apiUrls.getAllUsers}`)
            if (response.data.success) {
                setAllAdmins(response.data.data.reverse());
                console.log(response.data.data.reverse());
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const files = Array.from(e.target.files);
            //   setUploading(true);
            const newImageUrls = await Promise.all(
                files.map(async (file) => {
                    if (file) {
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                            const response = await axiosInstance.post(`${apiUrls.imageUpload}`, formData,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                })
                            if (response.data.success) {
                                return response.data.data.path;
                            }
                        } catch (error) {
                            console.error(error);
                            return '';
                        }
                    }
                    return '';
                })
            );

            // Update the previewImages state with existing images and new images
            setProfilePicturePreview((prevImages: any) => [...prevImages, ...newImageUrls.filter(url => url !== '')]);
            //   setUploading(false);
        }
    }
    const handleAddNewAdminsFromChange = (name: string, value: string) => {
        setAddNewAdminOrEditFormData((prev:any) => ({...prev, [name]:value}));
        console.log({[name]:value},addNewAdminOrEditFormData)

    }

    const handleAddNewAdminsFormSubmit = async () => { 
        try {
            console.log(addNewAdminOrEditFormData);
            const payload = {
                ...addNewAdminOrEditFormData,
                profile_pic: profilePicturePreview[0]
            }
            const response = await axiosInstance.post(`${apiUrls.addNewUser}`, payload)
            if (response.data.success) {
                alert('New admin added successfully!!!')
                setAddNewAdminOrEditFormData(initialAdminFormData);
                getAllAdmins();
                setAddOrEditAdmin({openForm:false,mode:'add'})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditAdminForm = (formData: any) => {
        setAddOrEditAdmin({openForm:true,mode:'edit'});
        setAddNewAdminOrEditFormData(formData);
        setProfilePicturePreview([formData.profile_pic])
    }

    const handleEditAdminsFormSubmit = async () =>{
        try {
            const payload = {
                ...addNewAdminOrEditFormData,
                profile_pic: profilePicturePreview[0]
            }
            const response = await axiosInstance.put(`${apiUrls.updateUserDetailsById}/${addNewAdminOrEditFormData._id}`, payload)
            if (response.data.success) {
                alert('Admin updated successfully!!!')
                setAddNewAdminOrEditFormData(initialAdminFormData);
                getAllAdmins();
                setAddOrEditAdmin({openForm:false,mode:'add'})
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
        getAllAdmins();
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

                        {!addOrEditAdmin.openForm && <Card className="h-full w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>
                                        <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            Manage Admins
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            See information about all members
                                        </Typography>
                                    </div>
                                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                        <Button variant="outlined" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            view all
                                        </Button>
                                        <Button className="flex items-center gap-3" size="sm" onClick={() => {setAddOrEditAdmin({openForm:true,mode:'add'}); setProfilePicturePreview([])}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Admin
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                    <Tabs value="all" className="w-full md:w-max">
                                        {/* <TabsHeader>
                                            {TABS.map(({ label, value }) => (
                                                <Tab key={value} value={value}>
                                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                                </Tab>
                                            ))}
                                        </TabsHeader> */}
                                    </Tabs>
                                    <div className="w-full md:w-72">
                                        <Input
                                            placeholder=''
                                            label="Search"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5" />} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-scroll px-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allAdmins && allAdmins.length > 0 && allAdmins.map(
                                            (admin:any, index:number) => {
                                                const isLast = index === TABLE_ROWS.length - 1;
                                                const classes = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={admin.full_name}>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${admin.profile_pic}`} alt={admin.full_name} size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                        {admin?.full_name}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                        {admin.email}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    {admin.city}
                                                                </Typography>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal opacity-70"
                                                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    {admin.state}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                    {admin.phone_number}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="w-max">
                                                                <Chip
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    // value={online ? "online" : "offline"}
                                                                    // color={online ? "green" : "blue-gray"}
                                                                    value={admin.role}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                                {formatDate(admin.createdAt)}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Tooltip content="Edit User">
                                                                <IconButton variant="text" 
                                                                 placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                                                 onClick={() => handleEditAdminForm(admin)}>
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Page 1 of 10
                                </Typography>
                                <div className="flex gap-2">
                                    <Button variant="outlined" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        Previous
                                    </Button>
                                    <Button variant="outlined" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>}
                        {addOrEditAdmin.openForm && <form className='w-4/6'>
                            <div className='flex justify-between items-center'>
                                <div> <h3>Add/Edit Admin </h3>
                                    <p className='cursor-pointer text-blue-600 mb-3' onClick={() => setAddOrEditAdmin({openForm:false,mode:'add'})}>Back To AdminsList</p></div>
                                <div >{
                                    profilePicturePreview && profilePicturePreview.length > 0 ?
                                        <Image src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${profilePicturePreview[0]}`} alt="" width={150} height={150} className='rounder-full' /> :
                                        <Image src={placeholderimg} alt="" width={150} height={150} className='rounder-full' />
                                }

                                </div>
                            </div>
                            <div className="form-container">
                                <label htmlFor="full_name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name='full_name'
                                    className="form-control"
                                    value={addNewAdminOrEditFormData.full_name}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="user_name">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    className="form-control"
                                    value={addNewAdminOrEditFormData.user_name}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>

                            <div className="form-container">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    required
                                    className="form-control"
                                    value={addNewAdminOrEditFormData.email}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>

                            <div className="form-container">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    required
                                    className="form-control"
                                    value={addNewAdminOrEditFormData.password}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>
                            
                            <div className="form-container">
                                <label htmlFor="date_of_birth">
                                   Date of Birth  
                                </label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    name='date_of_birth'
                                    className='form-control'
                                    value={addNewAdminOrEditFormData.date_of_birth}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>

                            <div className="form-container">
                                <label htmlFor="phone_number">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    className='form-control'
                                    value={addNewAdminOrEditFormData.phone_number}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>

                            <div className="form-container">
                                <label htmlFor="role">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name='role'
                                    className="form-control"
                                    value={addNewAdminOrEditFormData.role}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>

                            <div className="form-container">
                                <label htmlFor="profile_pic">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="profile_pic"
                                    name='profile_pic'
                                    className="form-control"
                                    onChange={handleProfilePictureUpload}
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="address">
                                    Address
                                </label>
                                <textarea
                                    rows={4}
                                    id="address"
                                    name='address'
                                    className='form-control'
                                    value={addNewAdminOrEditFormData.address}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="city">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name='city'
                                    className='form-control'
                                    value={addNewAdminOrEditFormData.city}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>
                            <div className="form-container">
                                <label htmlFor="state">
                                    State
                                </label>
                                <input
                                    id="state"
                                    name='state'
                                    className='form-control'
                                    value={addNewAdminOrEditFormData.state}
                                    onChange={(e) => handleAddNewAdminsFromChange(e.target.name, e.target.value )}
                                />
                            </div>
                           { addOrEditAdmin.mode == 'add' && <button
                                type="button"
                                className="py-2 px-4 bg-indigo-800 text-white rounded-md bg-indigo-900 transition duration-200"
                                onClick={handleAddNewAdminsFormSubmit}
                            >
                                Add Admin/Super Admin
                            </button>}
                            { addOrEditAdmin.mode == 'edit' && <button
                                type="button"
                                className="py-2 px-4 bg-indigo-800 text-white rounded-md bg-indigo-900 transition duration-200"
                                onClick={handleEditAdminsFormSubmit}
                            >
                                Edit Admin/Super Admin
                            </button>}
                        </form>}
                    </div>
                }

                {/* Manage Categories */}

                {
                    activeTab === 'MANAGE_CATEGORIES' &&
                    <div className="w-full min-h-screen">
                        <h3>Manage Catagories</h3>
                        <div className="bg-gray-50 flex justify-between items-start mb-4 border p-4 shadow-md rounded-md">
                            <div className="w-2/3">
                                <input
                                    className=" p-2 border border-gray-300 rounded-md w-full mb-2"
                                    value={category.name}
                                    onChange={(e) => setCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Category Name"
                                    type="text"
                                />
                                <textarea
                                    className=" p-2 border border-gray-300 rounded-md w-full mb-2"
                                    rows={5}
                                    value={category.description}
                                    onChange={(e) => setCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                                    placeholder="Category Description"
                                />
                                {
                                    updateCategory ?
                                        <button
                                            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
                                            onClick={updateSelectedCategory}
                                        >Update Category</button> :
                                        <button
                                            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
                                            onClick={addNewCategory}
                                        >Add Category</button>
                                }
                            </div>
                            {
                                updateCategory &&
                                <FaRegWindowClose className='text-[30px] text-gray-700 cursor-pointer'
                                    onClick={closeUpdateCategory}
                                />
                            }
                        </div>

                        {allCategory &&
                            allCategory.map((each: any, index: any) => (
                                <div key={index} className="bg-gray-200 shadow-md rounded-md mb-4">
                                    <Accordion open={open === index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <AccordionHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                            <div className="px-2 w-full flex items-center justify-between">
                                                <p className="text-xl font-semibold">{each.name}</p>
                                                <div className="flex gap-10 items-center">
                                                    <FaRegEye
                                                        onClick={() => toggleAccordion(index)}
                                                        className="text-[24px] text-green-500 cursor-pointer"
                                                    />

                                                    {/* <FaEyeSlash 
                                                    className="text-[24px] text-green-500 cursor-pointer"
                                                    onClick={() => toggleAccordion(index)}
                                                    /> */}
                                                    <FaEdit
                                                        onClick={() => handleUpdateCategory(each)}
                                                        className="text-[24px] text-indigo-500 cursor-pointer"
                                                    />
                                                    <MdDelete
                                                        onClick={() => handleDeleteCategory(each._id)}
                                                        className="text-[24px] text-red-600 cursor-pointer"
                                                    />
                                                </div>

                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody className="bg-gray-100 rounded-md p-3">
                                            <div className="space-y-2">
                                                <div className="bg-indigo-50 p-4 rounded-md border border-gray-300 my-2">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                        Description:
                                                    </label>
                                                    <p className="text-base text-gray-800">
                                                        {each.description}
                                                    </p>
                                                </div>

                                                <div className="flex space-x-4">
                                                    <input
                                                        className="bg-indigo-50 p-2 border border-gray-300 rounded-md w-64"
                                                        value={subCategory.name}
                                                        onChange={(e) => setSubCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                                                        placeholder="Subcategory Name"
                                                        type="text"
                                                    />
                                                    <input
                                                        className="bg-indigo-50 p-2 border border-gray-300 rounded-md w-64"
                                                        value={subCategory.description}
                                                        onChange={(e) => setSubCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                                                        placeholder="Subcategory Description"
                                                        type="text"
                                                    />
                                                    {
                                                        subCategory.open ?
                                                            <button
                                                                className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
                                                                onClick={() => updateSubcategory(each)}
                                                            >
                                                                Update Subcategory
                                                            </button>
                                                            :
                                                            <button
                                                                className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
                                                                onClick={() => addNewSubcategory(each)}
                                                            >
                                                                Add Subcategory
                                                            </button>
                                                    }
                                                </div>

                                                {each.sub_categories.map((subCategory: any) => (
                                                    <div key={subCategory.name} className="border-t border-gray-300 pt-4 flex items-center justify-between">
                                                        {/* Subcategory Name and Description */}
                                                        <div className='flex gap-10 items-center justify-start'>
                                                            <p className="w-[230px] text-md font-semibold text-gray-800">{subCategory.name}</p>
                                                            <p className="text-sm text-gray-500">{subCategory.description}</p>
                                                        </div>

                                                        {/* Edit and Delete Buttons */}
                                                        <div className="flex gap-10">
                                                            <FaEdit className='text-[20px] cursor-pointer' onClick={() => handleUpdateSubCategory(subCategory)} />
                                                            <MdDelete className='text-[20px] cursor-pointer' onClick={() => handleDeleteSubCategory(each, subCategory._id)} />
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