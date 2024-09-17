// pages/admin/verifyClaim.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/app/services/axiosInterceptor';
import { apiUrls } from '@/app/config/api.config';
import { useRouter } from 'next/navigation';

const claimVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [claimId, setClaimId] = useState('');
  const [itemDetails, setItemDetails] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>({});
  const [userClaimDetails, setUserClaimDetails] = useState<any>({});
  const [adminRemark, setAdminRemark] = useState<any>('');
  

  const handleClaimStatusUpdate = async (eventType:any) => {
    let claimStatus:string = '';
    if (eventType === 'approve') {
       claimStatus = 'CLOSED';
    } else if (eventType === 'inprogress') {
       claimStatus = 'IN_PROGRESS';
    } else if (eventType === 'reject') {
       claimStatus = 'NEW_REQUEST';
    }
    const updateDetails = {status:claimStatus, admin_remarks:adminRemark}
    const response = await axiosInstance.put(`${apiUrls.updateClaimDetailsById}/${claimId}`, updateDetails )
    console.log(response.data);
    if (response.data.success) {
      router.push('/claimstatus');
    }

  };

  const fetchClaimDetails = async (claimId:string) => { 
  const response = await axiosInstance.get(`${apiUrls.getClaimDetailsByID}/${claimId}`);
  console.log(response.data);
  if (response.data.success) {
    const itemDetails = response.data?.data?.item_details || {};
    const userDetails = response.data?.data?.claim_details?.user_id || {};
    const userClaimDetails = response.data?.data?.claim_details?.claim_details || {};
    setAdminRemark(response.data?.data?.admin_remarks)
     setItemDetails(itemDetails);
     setUserDetails(userDetails);
     setUserClaimDetails(userClaimDetails);
     
  }
}

  useEffect(() => {
    const claimId = searchParams.get('claimId');
    if (claimId) {
      setClaimId(claimId);
      fetchClaimDetails(claimId);
    }
  },[])

  return (
    <div className="container mx-auto py-6">
      <h3 className="text-3xl font-bold mb-4">Verify Claim</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item Details */}
        <div className="bg-gray-200 shadow-md rounded-md p-6">
          <h4 className="text-xl font-semibold mb-2">Item Details</h4>
          <p className="mb-2"><strong>Name:</strong> {itemDetails?.item_name}</p>
          <p className="mb-2"><strong>Model Number:</strong> {itemDetails.model_number}</p>
          <p className="mb-2"><strong>Serial Number:</strong> {itemDetails.serial_number}</p>
          <p className="mb-2"><strong>Primary Color:</strong> {itemDetails.primary_color}</p>
          <p className="mb-2"><strong>Category:</strong> {itemDetails.category}</p>
          <p className="mb-2"><strong>Sub Category:</strong> {itemDetails.sub_category}</p>
          <p className="mb-2"><strong>Brand:</strong> {itemDetails.brand}</p>
          <p className="mb-2"><strong>Description:</strong> {itemDetails.description}</p>
          <p className="mb-2"><strong>Location Description:</strong> {itemDetails.location_description}</p>
          <p className="mb-2"><strong>Additional Remarks:</strong> {itemDetails.additional_remarks}</p>
          <div className="mt-4">
            <h6 className="font-semibold">Images</h6>
            <div className="flex gap-4">
              {itemDetails && itemDetails?.image_urls?.length > 0 && itemDetails.image_urls.map((url:any, index:any) => (
                <img key={index} src={url} alt="Item image" width={150} height={150} className="border" />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h6 className="font-semibold">Tags</h6>
            <p>{itemDetails && itemDetails?.tag && itemDetails.tags.join(', ')}</p>
          </div>
        </div>

        {/* User and Claim Details */}
        <div className="bg-gray-200 shadow-md rounded-md p-6">
          <h4 className="text-xl font-semibold mb-2">User & Claim Details</h4>
          <p className="mb-2"><strong>Claim Item Description:</strong> {userClaimDetails.description}</p>
          <p className="mb-2"><strong>Lost Item location:</strong> {userClaimDetails.location}</p>
          <p className="mb-2"><strong>Username:</strong> {userDetails.user_name}</p>
          <p className="mb-2"><strong>Email:</strong> {userDetails.email}</p>
          <div className=''>
            <label htmlFor="adminRemark" className='mb-2 font-medium'>Admin Remarks:</label>
            <input type="text" placeholder='Enter remarks user' className='form-control'
            value={adminRemark} onChange={(e) => setAdminRemark(e.target.value)}/>
          </div>
          <div className="mt-6 flex">
            <button
              className="bg-deep-purple-600 text-white px-4 py-2 m-2 rounded hover:bg-deep-purple-900"
              onClick={() => handleClaimStatusUpdate('approve')}
            >
              Approve Claim
            </button>
            <button
              className="bg-deep-purple-600 text-white px-4 py-2 m-2 rounded hover:bg-deep-purple-900"
              onClick={() => handleClaimStatusUpdate('inprogress')}
            >
              Keep In Progress
            </button>
            <button
              className="bg-deep-purple-600 text-white px-4 py-2 m-2 rounded hover:bg-deep-purple-900"
              onClick={() => handleClaimStatusUpdate('reject')}
            >
              Reject Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default claimVerification;
