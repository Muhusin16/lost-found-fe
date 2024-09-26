"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/services/axiosInterceptor";
import { apiUrls } from "@/app/config/api.config";
import { useRouter } from "next/navigation";

const ClaimVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [claimId, setClaimId] = useState("");
  const [itemDetails, setItemDetails] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>({});
  const [userClaimDetails, setUserClaimDetails] = useState<any>({});
  const [adminRemark, setAdminRemark] = useState<any>("");

  const handleClaimStatusUpdate = async (eventType: any) => {
    let claimStatus: string = "";
    if (eventType === "approve") {
      claimStatus = "CLOSED";
    } else if (eventType === "inprogress") {
      claimStatus = "IN_PROGRESS";
    } else if (eventType === "reject") {
      claimStatus = "NEW_REQUEST";
    }
    const updateDetails = {
      status: claimStatus,
      admin_remarks: adminRemark,
    };
    const response = await axiosInstance.put(
      `${apiUrls.updateClaimDetailsById}/${claimId}`,
      updateDetails
    );
    console.log(response.data);
    if (response.data.success) {
      router.push("/claimstatus");
    }
  };

  const fetchClaimDetails = async (claimId: string) => {
    const response = await axiosInstance.get(
      `${apiUrls.getClaimDetailsByID}/${claimId}`
    );
    console.log(response.data);
    if (response.data.success) {
      const itemDetails = response.data?.data?.item_details || {};
      const userDetails = response.data?.data?.claim_details?.user_id || {};
      const userClaimDetails =
        response.data?.data?.claim_details?.item_details || {};
      setAdminRemark(response.data?.data?.admin_remarks);
      setItemDetails(itemDetails);
      setUserDetails(userDetails);
      setUserClaimDetails(userClaimDetails);
    }
  };

  useEffect(() => {
    const claimId = searchParams.get("claimId");
    if (claimId) {
      setClaimId(claimId);
      fetchClaimDetails(claimId);
    }
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Verify Claim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item Details */}
        <div className="shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Item Details</h2>
          <p className="mb-2">
            <strong>Name:</strong> {itemDetails?.item_name}
          </p>
          <p className="mb-2">
            <strong>Model Number:</strong> {itemDetails.model_number}
          </p>
          <p className="mb-2">
            <strong>Serial Number:</strong> {itemDetails.serial_number}
          </p>
          <p className="mb-2">
            <strong>Primary Color:</strong> {itemDetails.primary_color}
          </p>
          <p className="mb-2">
            <strong>Category:</strong> {itemDetails.category}
          </p>
          <p className="mb-2">
            <strong>Sub Category:</strong> {itemDetails.sub_category}
          </p>
          <p className="mb-2">
            <strong>Brand:</strong> {itemDetails.brand}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {itemDetails.description}
          </p>
          <p className="mb-2">
            <strong>Location Description:</strong>{" "}
            {itemDetails.location_description}
          </p>
          <p className="mb-2">
            <strong>Additional Remarks:</strong>{" "}
            {itemDetails.additional_remarks}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="flex gap-4 mt-2">
              {itemDetails?.image_urls?.length > 0 &&
                itemDetails.image_urls.map((url: any, index: any) => (
                  <Image
                    key={index}
                    src=''
                    alt="Item image"
                    width={150}
                    height={150}
                    className="border"
                  />
                ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p>
              {itemDetails?.tags?.length > 0
                ? itemDetails.tags.join(", ")
                : "No tags available"}
            </p>
          </div>
        </div>

        {/* User and Claim Details */}
        <div className="shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User & Claim Details</h2>
          <p className="mb-2">
            <strong>Claim Item Description:</strong> {userClaimDetails.description}
          </p>
          <p className="mb-2">
            <strong>Lost Item location:</strong> {userClaimDetails.location}
          </p>
          <p className="mb-2">
            <strong>Username:</strong> {userDetails.user_name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userDetails.email}
          </p>

          <div className="mt-4">
            <label htmlFor="adminRemark" className="font-medium mb-2 block">
              Admin Remarks:
            </label>
            <textarea
              id="adminRemark"
              className="w-full border border-gray-300 rounded-lg p-2 mt-2"
              value={adminRemark}
              onChange={(e) => setAdminRemark(e.target.value)}
            />
          </div>

          <div className="mt-6 flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => handleClaimStatusUpdate("approve")}
            >
              Approve Claim
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => handleClaimStatusUpdate("inprogress")}
            >
              Keep In Progress
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => handleClaimStatusUpdate("reject")}
            >
              Reject Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimVerification;
