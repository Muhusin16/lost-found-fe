"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./claimstatus.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import axiosInstance from "@/app/services/axiosInterceptor";
import { apiUrls } from "@/app/config/api.config";
import { useRouter } from "next/navigation";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const claimStatus = [
    { label: "New Claim Requests", value: "NEW_REQUEST" },
    { label: "In Progress Claims", value: "IN_PROGRESS" },
    { label: "Confirmed Claims", value: "CLOSED" },
    { label: "Returned Claims", value: "RETURNED" },
];

const ClaimStatus: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("NEW_REQUEST");
    const [allClaims, setAllClaims] = useState([]);
    const [filteredClaimRequests, setFilteredClaimRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [claimsPerPage] = useState(10);

    const handleClaimStatusChange = (claimStatus: string): void => {
        const filteredClaims = allClaims.filter(
            (claim: any) =>
                claim.status.toLowerCase() === claimStatus.toLowerCase()
        );
        setActiveTab(claimStatus);
        setFilteredClaimRequests(filteredClaims);
        setCurrentPage(1); // Reset to first page on status change
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
        const filteredClaims = allClaims.filter((claim: any) =>
            claim.item_details?.item_name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClaimRequests(filteredClaims);
        setCurrentPage(1); // Reset to first page on search
    };

    const fetchAllClaimProducts = async () => {
        try {
            const response = await axiosInstance.get(apiUrls.getAllClaims);
            if (response.data.success) {
                const claimRequests = response.data.data;
                setAllClaims(claimRequests);
                setFilteredClaimRequests(
                    claimRequests.filter(
                        (claim: any) =>
                            claim.status.toLowerCase() === "NEW_REQUEST".toLowerCase()
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllClaimProducts();
    }, []);

    const handleClaimRequestDetail = (claimId: any) => {
        router.push(`/claimverification?claimId=${claimId}`);
    };

    // Pagination logic
    const indexOfLastClaim = currentPage * claimsPerPage;
    const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
    const currentClaims = filteredClaimRequests.slice(
        indexOfFirstClaim,
        indexOfLastClaim
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className={styles.claimStatusContainer}>
            <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
                <Tabs
                    value={activeTab}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <TabsHeader
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        {claimStatus.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => handleClaimStatusChange(value)}
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>

                    <TabsBody
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <TabPanel value={activeTab}>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div></div> {/* Placeholder for possible other content */}

                                    {/* Container for search input */}
                                    <div className="w-full md:w-72">
                                        <Input
                                            placeholder=''
                                            label="Search"
                                            icon={<MagnifyingGlassIcon className="h-5 w-5" />} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                    </div>
                                </div>
                           
                            {currentClaims.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Product Id
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Name
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Location
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Claim Date
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Claimed By
                                                </th>
                                                <th className="border border-gray-300 px-4 py-2">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentClaims.map(
                                                ({
                                                    item_details,
                                                    claim_details,
                                                    createdAt,
                                                    _id,
                                                }: any) => (
                                                    <tr
                                                        key={item_details?._id}
                                                        className="hover:bg-gray-100"
                                                    >
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {item_details?.custom_id}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {item_details?.item_name}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {item_details?.location_description}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {createdAt}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {claim_details?.user_id?.user_name}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <Button
                                                                color="purple"
                                                                onClick={() =>
                                                                    handleClaimRequestDetail(_id)
                                                                }
                                                                placeholder={undefined}
                                                                onPointerEnterCapture={undefined}
                                                                onPointerLeaveCapture={undefined}
                                                            >
                                                                View Details
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <div className="flex justify-end mt-4">
                                        <nav>
                                            <ul className="inline-flex">
                                                {Array.from(
                                                    {
                                                        length: Math.ceil(
                                                            filteredClaimRequests.length / claimsPerPage
                                                        ),
                                                    },
                                                    (_, index) => (
                                                        <li key={index} className="mx-1">
                                                            <button
                                                                className={`px-3 py-1 rounded ${currentPage === index + 1
                                                                        ? "bg-blue-500 text-white"
                                                                        : "bg-gray-200"
                                                                    }`}
                                                                onClick={() => paginate(index + 1)}
                                                            >
                                                                {index + 1}
                                                            </button>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            ) : (
                                <Typography
                                    variant="h6"
                                    color="gray"
                                    className="text-center mt-4"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                >
                                    No claims found for this status.
                                </Typography>
                            )}
                        </div>
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    </div >
  );
};

export default ClaimStatus;
