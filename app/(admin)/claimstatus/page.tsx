"use client"
import react, { FC, useEffect, useState } from 'react';
import styles from './claimstatus.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { fetchAllProducts } from '@/app/store/productsSlice';
import Image from 'next/image';
import placeholderImage from '../../assets/placeholder-img.jpg'
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';

const claimStatus = [
    {
        label: "New Claim Requests",
        value: "NEW_REQUEST",
    },
    {
        label: "In Progress Claims",
        value: "IN_PROGRESS",
    },
    {
        label: "Confirmed Claims",
        value: "CLOSED",
    },
    {
        label: "Returned Claims",
        value: "RETURNED",
    },
];
const ClaimStatus: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { products, status } = useSelector((state: RootState) => state.products)
    const [activeTab, setActiveTab] = useState("NEW_REQUEST");
    const [allClaims, setAllClaims] = useState([]);
    const [filteredClaimRequests, setFilteredClaimRequests] = useState([])

    const handleProductClaimRequest = (product: any) => {
        console.log('Clicked Product:', product)
        // Add your logic to handle product claim request here.
    }

    const handleClaimRequestDetail = (claimId:any) => {
        router.push('/claimverification');
    }

    const handleClaimStatusChange = (claimStatus: any): void => {
        if (typeof claimStatus === 'string') {
            const filteredClaims = allClaims.filter((claim: any) =>
                claim.status.toLowerCase() === claimStatus.toLowerCase()
            );
            setActiveTab(claimStatus);
            console.log(filteredClaims);
            setFilteredClaimRequests(filteredClaims);
        } else {
            console.error('Invalid claimStatus:', claimStatus);
        }
    }

    const fetchAllClaimProducts = async () => {
        try {
            const response = await axiosInstance.get(apiUrls.getAllClaims);
            console.log(response.data);
            if (response.data.success) {
                const claimRequests = response.data.data;
                setAllClaims(claimRequests);
                const filteredClaims = claimRequests.filter((claim: any) => {
                 return  claim.status.toLowerCase() === 'NEW_REQUEST'.toLowerCase();
                }
                );
                setFilteredClaimRequests(filteredClaims);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllClaimProducts();
    }, [])
    return (
        <div className={styles.claimStatusContainer}>
            <div className="w-full mx-auto">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-20">
                        {claimStatus.map(({ label, value }) => (
                            <button
                                key={value}
                                className={`py-2 px-4 font-semibold text-sm rounded-t-md transition duration-300 ${activeTab === value
                                    ? "text-deep-purple-900 border-b-2 border-deep-purple-900 "
                                    : "text-gray-600 hover:text-gray-700"
                                    }`}
                                onClick={() => handleClaimStatusChange(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="mt-4">
                            <div className="overflow-x-auto">
                                {filteredClaimRequests.length > 0 && (
                                    <table className="w-4/5 bg-white shadow-md rounded-lg">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-gray-700">Product Id</th>
                                                <th className="px-4 py-2 text-left text-gray-700">Name</th>
                                                <th className="px-4 py-2 text-left text-gray-700">Location</th>
                                                <th className="px-4 py-2 text-left text-gray-700">Claim Date</th>
                                                <th className="px-4 py-2 text-left text-gray-700">Claimed By</th>
                                                <th className="px-4 py-2 text-left text-gray-700">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClaimRequests && filteredClaimRequests.map(({item_details,claim_details,createdAt,_id}:any) => (
                                                <tr key={item_details?._id} className="border-t">
                                                     <td className="px-4 py-2 text-gray-800">{item_details?._id}</td>
                                                    <td className="px-4 py-2 text-gray-800">{item_details?.item_name}</td>
                                                    <td className="px-4 py-2 text-gray-800">{item_details?.location_description}</td>
                                                    <td className="px-4 py-2 text-gray-800">{createdAt}</td>
                                                    <td className="px-4 py-2 text-gray-800">{claim_details?.user_id?.user_name}</td>
                                                   
                                                    <td className="px-4 py-2">
                                                        <button className="bg-deep-purple-600 hover:bg-deep-purple-900 text-white font-bold py-2 px-4 rounded-lg"
                                                        onClick={() => handleClaimRequestDetail(_id)}>
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                </div>
            </div>
        </div>
    )
}

export default ClaimStatus;