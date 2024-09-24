'use client'
import React, { useEffect, useState } from 'react'
import styles from './userprofile.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { getJsonValueFromLocalStorage } from '@/app/services/coreServices';
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';

const UserProfile = () => {
    const [checked, setChecked] = useState(false);

   const userDetails =  getJsonValueFromLocalStorage('userDetails');
   console.log('userDetails', userDetails);
  const payload = {
    phone_number : '112324234',
    address:"hsr layout "

  }
   const handleUserProfileSubmit = async () => {
    const response = await axiosInstance.put(`${apiUrls.updateUserDetailsById}/${userDetails._id}`, payload);
    console.log(response.data);
    
   }
   
   handleUserProfileSubmit();
    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl border-t-4 border-indigo-600">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Complete Your Profile</h1>

            <form className="space-y-6">

                <div>
                    <label htmlFor="profilePic" className="block text-base font-medium text-gray-700 mb-2">Profile Picture</label>
                    <input type="file" id="profilePic" className="w-full text-sm text-gray-500 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 transition duration-200 ease-in-out hover:bg-gray-100" />
                </div>

                <div>
                    <label htmlFor="title" className="block text-base font-medium text-gray-700">Title</label>
                    <select id="title" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out">
                        <option value="Mr">Mr.</option>
                        <option value="Miss">Miss</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Dr">Dr.</option>
                        <option value="Prof">Prof.</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-base font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fullName" placeholder="John Doe" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
                    <input type="email" id="email" placeholder="john@example.com"  value={userDetails.email} className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-base font-medium text-gray-700">Phone Number</label>
                    <input type="tel" id="phone" placeholder="" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="dob" className="block text-base font-medium text-gray-700">Date of Birth</label>
                    <input type="date" id="dob" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">Govt. ID card</label>
                    <input id="address" type="file" placeholder="PAN/Adhar/Passport/Driving License" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">Address</label>
                    <input id="address" placeholder="" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">Pincode</label>
                    <input id="address" placeholder="" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">City</label>
                    <input id="address" placeholder="" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-base font-medium text-gray-700">State</label>
                    <input id="address" placeholder="" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out" />
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700">Gender</label>
                    <div className="mt-3 flex space-x-6">
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="male" className="mr-2" /> Male
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="female" className="mr-2" /> Female
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" value="other" className="mr-2" /> Other
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <input type="checkbox" id="terms" onChange={(e) => setChecked(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-700">I accept the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a></span>
                    </label>
                </div>

                <div className="text-center mt-6">
                    <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50" disabled={!checked}>
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile