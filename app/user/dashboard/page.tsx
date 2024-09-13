'use client'
import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { fetchAllProducts } from '@/app/store/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { HiRefresh } from "react-icons/hi";
import styles from './dashboard.module.scss'
import { useRouter } from 'next/navigation';

const TABLE_HEAD = ["Id No.", "Date", "Location", "Item Name", "Action"];

const Dashboard = () => {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [itemList, setItemList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState({
    to: '',
    from: ''
  });

  const { products, status } = useSelector((state: RootState) => state.products);

  const handleClaimItem = (item: any) => {
    console.log(item);
    router.push(`/user/dashboard/${item}`);
  }

  const showResultByName = () => {
    if (keyword) {
      let filterByName: any = products.filter((item: any) => {
        return item.title.toLowerCase().includes(keyword.toLowerCase())
          ||
          item.specificLocation.toLowerCase().includes(keyword.toLowerCase());
      });
      if (!filterByName.length) {
        alert('No products found for the selected keyword')
      }
      setItemList(filterByName)
    }
    else if (keyword == '') {
      alert('Please enter a value to search for your item')
    }
  }

  function formatDate(d: any) {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  let filterByDate: any;

  // Filter products by date
  const showResultByDate = () => {
    let toDate = new Date(dateRange.to);
    let fromDate = new Date(dateRange.from);

    if (dateRange.to && dateRange.from) {

      // Storing the from and to dates in local storage
      localStorage.setItem('dateRangeFrom', dateRange.from);
      localStorage.setItem('dateRangeTo', dateRange.to);

      filterByDate = products.filter((item: any) => {
        let itemDate = new Date(item.dateLost);
        // console.log(toDate, fromDate, itemDate);

        return itemDate >= fromDate && itemDate <= toDate;
      });
      let filterByAscendingDate = filterByDate.sort((date1: any, date2: any) => {
        console.log(new Date(date2.dateLost).getTime(), new Date(date1.dateLost).getTime())
        return new Date(date2.dateLost).getTime() - new Date(date1.dateLost).getTime();

      })
      // console.log(filterByDate);
      setItemList(filterByAscendingDate);

      if (toDate < fromDate || fromDate > toDate) {
        alert("Select the valid 'From' and 'To' date range");
      }
      if (!filterByDate.length) {
        alert('No items exist for the selected date range');
      }
    }
    else {
      alert('Select the valid date range');

    }
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts())
      console.log("Products")
    }
  }, [dispatch, status])

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className='flex items-center justify-between w-2/3'>
          <div className=" my-5">
            <input
              name="fromDate"
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              type='date'
              className="border border-gray-300 px-4 py-2"
            />
            <input
              name="toDate"
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              type='date'
              className="border border-gray-300 px-4 py-2"
            />
            <button onClick={showResultByDate} className="border border-black bg-black text-white px-4 py-2">
              Search within the date
            </button>
          </div>
          <div className="flex justify-center items-center my-5">
            <HiRefresh onClick={() => setItemList([])} className={`${styles.refreshIcon} me-5 text-xl`} />
            <input
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-gray-300 px-4 py-2"
              placeholder="Search for the item..."
            />
            <button onClick={showResultByName} className="border border-black bg-black text-white px-4 py-2">
              Search
            </button>
          </div>
        </div>
        {
          itemList.length > 0 ?
            <Card className="h-full w-full w-2/3"
              placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-gray-400 p-4"
                      >
                        <Typography
                          variant="small"
                          color="black"
                          className="text-lg font-bold leading-none opacity-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((product: any, index) => {
                    const isLast = index === products.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                            {product._id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                            {formatDate(product.dateLost)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                            {product.specificLocation}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="text-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                            {product.title}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => handleClaimItem(product._id)}>
                            Claim Item
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card> :
            <p className='mt-20 text-lg opacity-50'>Search for your item by selecting the date range...</p>
        }

      </div>
    </>
  )
}

export default Dashboard


