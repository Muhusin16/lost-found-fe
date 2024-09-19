'use client'
import React, { useEffect, useState} from 'react'
import styles from './claimrequest.module.scss'
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';

const ClaimRequest = () => {

    const TABLE_HEAD = [
        "Item Name",
        "Item ID",
        "Location",
        "Date of Claim",
        "Edit", 
        "Status",
        "Action"
    ];
    const [userClaimRequests, setUserClaimRequests] = useState([]);

    const getUserClaimRequests = async () => {
       try {
        const response = await axiosInstance.get(`${apiUrls.getClaimByUser}`);
        if (response.data.success) {
            const userClaimRequests = response.data.data;
            setUserClaimRequests(userClaimRequests);
            console.log(userClaimRequests);
        }
        console.log(response.data);
       } catch (error) {
        console.log(error);
        
       }
    }
    useEffect(() => {
        getUserClaimRequests();
    },[])
    return (
        <div className="container mx-auto p-4">
            <div className="shadow-lg rounded-lg">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                        <tr>
                            {
                                TABLE_HEAD.map((header: any) => (
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">{header}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {   userClaimRequests && userClaimRequests.length > 0 &&
                            userClaimRequests.map((claim: any) => (
                                <>
                                    <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim?.item_details?.item_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim?.item_details?.custom_id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim?.claim_details?.item_details?.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim?.createdAt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800">
                                                {claim?.status == 'NEW_REQUEST' || claim?.status == 'IN_PROGRESS'  ? 'In Progress' : claim?.status == 'CLOSED' ? 'Approved' :  claim?.status == 'RETURNED' ? 'Returned' : 'Rejected'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-800 px-4 py-2 rounded-md hover:from-yellow-500 hover:to-yellow-700 text-sm shadow-md">
                                                Found your item and want to close?
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default ClaimRequest