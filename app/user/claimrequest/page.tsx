import React from 'react'
import styles from './claimrequest.module.scss'

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

    const TABLE_DATA = [
        {
            itemName: "Laptop",
            itemId: "12345",
            location: "Room 101",
            dateOfClaim: "2022-01-01",
            edit: <a href="#"><i className="fas fa-edit"></i></a>,
            status: "Pending",
            action: <a href="#"><i className="fas fa-check"></i></a>
        },
        {
            itemName: "Mobile",
            itemId: "67890",
            location: "Room 202",
            dateOfClaim: "2022-02-01",
            edit: <a href="#"><i className="fas fa-edit"></i></a>,
            status: "Closed",
            action: <a href="#"><i className="fas fa-check"></i></a>
        }
    ];
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto shadow-lg rounded-lg">
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
                        {
                            TABLE_DATA.map((item: any) => (
                                <>
                                    <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.itemId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateOfClaim}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800">{item.status}</span>
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