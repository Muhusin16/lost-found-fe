'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { getJsonValueFromLocalStorage, setJsonValueInLocalStorage } from '@/app/services/coreServices';
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import Image from 'next/image';

const UserProfile = () => {
    const [checked, setChecked] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const initialFormData = {
        full_name: '',
        title: '',
        phone_number: '',
        date_of_birth: '',
        address: "",
        pincode: '',
        city: '',
        state: '',
        gender: '',
        profile_pic: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const userDetails = getJsonValueFromLocalStorage('userDetails');



    const fetchUserProfileDetail = async () => {
        try {
            const response = await axiosInstance.get(`${apiUrls.getUserDetails}/${userDetails._id}`);

            const userProfileDetail = response.data.data
            setFormData({
                full_name: userProfileDetail.full_name,
                title: userProfileDetail.title,
                phone_number: userProfileDetail.phone_number,
                date_of_birth: userProfileDetail.date_of_birth,
                address: userProfileDetail.address,
                pincode: userProfileDetail.pincode,
                city: userProfileDetail.city,
                state: userProfileDetail.state,
                gender: userProfileDetail.gender,
                profile_pic: userProfileDetail.profile_pic
            })
            setEditProfile(false)
            setJsonValueInLocalStorage('userDetails', userProfileDetail)
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserProfileSubmit = async () => {
        try {
            const response = await axiosInstance.put(`${apiUrls.updateUserDetailsById}/${userDetails._id}`, formData);
            setIsReadOnly(true)
            fetchUserProfileDetail();
        } catch (error) {
            console.log(error);

        }
    }

    const uploadProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
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
                                }
                            )
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

            setFormData((prev: any) => ({
                ...prev,
                profile_pic: `${newImageUrls[0]}`
            }))
        }
    }


    const updateUserProfile = () => {
        setEditProfile(true);
        setIsReadOnly(false)
    }

    const closeEditProfile = () => {
        setEditProfile(false);
    }

    useEffect(() => {
        fetchUserProfileDetail();
    }, [])

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl border-t-4 border-indigo-600">
            <div className='flex justify-between items-start'>
                {
                    editProfile ?
                        <>
                            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Update Profile</h1>
                            <div className='flex gap-2 items-center'>

                                <FaRegWindowClose className='text-[30px] text-gray-700 cursor-pointer'
                                    onClick={closeEditProfile}
                                />
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">{formData.full_name}</h1>
                            <div className='flex gap-2 items-center cursor-pointer' onClick={updateUserProfile}>
                                <p className='text-gray-500'>Edit Profile</p>
                                <FaEdit
                                    className="text-[16px] text-gray-500"
                                />
                            </div>
                        </>
                }
            </div>
            <form className="space-y-6">
                {
                    !editProfile ?
                        <>
                            {formData.profile_pic && (
                                <div className='h-full w-full flex justify-center items-center mt-4'>
                                    <Image
                                        width={100} height={100}
                                        src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${formData.profile_pic}`}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                    />
                                </div>
                            )}
                        </>
                        :
                        <>
                            {formData.profile_pic && (
                                <div className="h-full w-full flex justify-center items-center' mt-4">

                                    <Image
                                        width={100} height={100}
                                        src={`${process.env.NEXT_PUBLIC_FIRESTORE_BASE_URL}${formData.profile_pic}`}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="profilePic" className="block text-base font-medium text-gray-700 mb-2">Profile Picture</label>
                                <input type="file"
                                    id="profilePic"
                                    accept="image/*"
                                    disabled={isReadOnly}
                                    onChange={uploadProfilePic}
                                    className="w-full text-sm text-gray-500 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200 ease-in-out hover:bg-gray-100" />
                            </div>
                        </>

                }

                <>


                </>

                {/* <div className='h-full flex justify-center items-center'>
                            <div className="w-[140px] h-[140px] rounded-full overflow-hidden border border-gray-300 shadow-md flex items-center justify-center bg-gray-100">
                                <img src="" alt="" className="w-full h-full object-cover" />
                            </div>
                        </div> */}

                <div>
                    <label htmlFor="title" className="block text-base font-medium text-gray-700">Title</label>
                    <select
                        id="title"
                        disabled={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            title: e.target.value
                        }))}
                        value={formData.title}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out">
                        <option className='Mr'>Mr.</option>
                        <option value='Miss'>Miss</option>
                        <option value='Mrs'>Mrs.</option>
                        <option value='Dr'>Dr.</option>
                        <option value='Prof'>Prof.</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-base font-medium text-gray-700">Full Name</label>
                    <input type="text"
                        id="fullName"
                        placeholder="John Doe"
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            full_name: e.target.value
                        }))}
                        value={formData.full_name}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        readOnly={true}
                        value={userDetails.email}
                        placeholder="john@example.com"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-base font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder=""
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            phone_number: e.target.value
                        }))}
                        value={formData.phone_number}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="dob" className="block text-base font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            date_of_birth: e.target.value
                        }))}
                        value={formData.date_of_birth}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">Address</label>
                    <input
                        id="address"
                        placeholder=""
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            address: e.target.value
                        }))}
                        value={formData.address}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">Pincode</label>
                    <input
                        id="address"
                        placeholder=""
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            pincode: e.target.value
                        }))}
                        value={formData.pincode}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">City</label>
                    <input
                        id="address"
                        placeholder=""
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            city: e.target.value
                        }))}
                        value={formData.city}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">State</label>
                    <input
                        id="address"
                        placeholder=""
                        readOnly={isReadOnly}
                        onChange={(e) => setFormData((prev: any) => ({
                            ...prev,
                            state: e.target.value
                        }))}
                        value={formData.state}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                {
                    editProfile ? <>
                        <div>
                            <label className="block text-base font-medium text-gray-700">Gender</label>
                            <div className="mt-3 flex space-x-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        readOnly={isReadOnly}
                                        onChange={(e) => setFormData((prev: any) => ({
                                            ...prev,
                                            gender: e.target.value
                                        }))}
                                        checked={formData.gender === 'Male'}
                                        className="mr-2" /> Male
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender"
                                        readOnly={isReadOnly}
                                        onChange={(e) => setFormData((prev: any) => ({
                                            ...prev,
                                            gender: e.target.value
                                        }))}
                                        value="Female"
                                        checked={formData.gender === 'Female'}
                                        className="mr-2" /> Female
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender"
                                        readOnly={isReadOnly}
                                        onChange={(e) => setFormData((prev: any) => ({
                                            ...prev,
                                            gender: e.target.value
                                        }))}
                                        value="Other"
                                        checked={formData.gender === 'Other'}
                                        className="mr-2" /> Other
                                </label>
                            </div>
                        </div>
                    </>
                        :
                        <div>
                            <label htmlFor="address" className="block text-base font-medium text-gray-700">Gender</label>
                            <input
                                id="address"
                                placeholder=""
                                readOnly={isReadOnly}
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    state: e.target.value
                                }))}
                                value={formData.gender}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                        </div>

                }



                {
                    editProfile ? <>
                        <div className="mt-4">
                            <label className="flex items-center">
                                <input type="checkbox" id="terms" onChange={(e) => setChecked(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                <span className="ml-2 text-sm text-gray-700">I accept the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a></span>
                            </label>
                        </div>

                        <div className="text-center mt-6">
                            <button type="button"
                                onClick={handleUserProfileSubmit}
                                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50" disabled={!checked}>
                                Save Profile
                            </button>
                        </div>
                    </>
                        :
                        <>

                        </>
                }


            </form>
        </div >
    )
}

export default UserProfile