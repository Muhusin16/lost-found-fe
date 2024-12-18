"use client";
import React, { useState } from 'react'
import styles from './claimProperty.module.scss'

const ClaimProperty = ({ params }: any) => {

  const [showAdditionalForm, setShowAdditionalForm] = useState(true);

  return (

    <div className={styles.userForm}>
      <div className="bg-gray-100 p-10 rounded-lg shadow-lg w-2/3">
        <h2 className={`${styles.userFormHeading} font-bold mb-6 text-center`}>Lost and Found Claim Form</h2>
        <form action="/submit-form" method="post" >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={styles.labelStyle} htmlFor="title">Title:</label><br />
              <input placeholder="Mr/Miss/Mrs" className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="title" name="title" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="fullName">Full Name:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="fullName" name="fullName" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="email">Email:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="email" id="email" name="email" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="phoneNumber">Mobile Number:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="tel" id="phoneNumber" name="phoneNumber" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="phoneNumber">Alternate Number:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="tel" id="phoneNumber" name="phoneNumber" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="idCard">Govt. ID (PAN/Adhar/Passport/Driving License):</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="file" id="idCard" name="idCard" required /><br /><br />


            </div>

            <div>

              <label className={styles.labelStyle} htmlFor="state">Date of Claim</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="state" name="state" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="address">Address:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="address" name="address" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="pincode">Pincode:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="pincode" name="pincode" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="city">City:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="city" name="city" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="state">State:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="state" name="state" required /><br /><br />

              <label className={styles.labelStyle} htmlFor="idCard">Upload Photo:</label><br />
              <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="file" id="idCard" name="idCard" required /><br /><br />

            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={styles.labelStyle} htmlFor="description">Date and Time of Loss:</label><br />
              <textarea className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} id="description" name="description" rows={4} required></textarea><br /><br />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={styles.labelStyle} htmlFor="description">Circumstances of Loss:</label><br />
              <textarea className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} id="description" name="description" rows={4} required></textarea><br /><br />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value={'representative'} onChange={() => setShowAdditionalForm(!showAdditionalForm)} checked={showAdditionalForm === true} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><h4 className='mt-3'>Collecting on behalf of someone else?</h4></label>
          </div>

          {
            showAdditionalForm &&
            <div className="bg-gray-200 rounded-lg p-5 grid grid-cols-1 gap-4">
              <div>
                <label className={styles.labelStyle} htmlFor="address">User Relation to Item (Owner, Relative of owner, etc):</label><br />
                <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="address" name="address" required /><br /><br />

                <label className={styles.labelStyle} htmlFor="pincode">Authorized Representative Name (if applicable): If claiming on behalf of someone else.</label><br />
                <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="pincode" name="pincode" required /><br /><br />

                <label className={styles.labelStyle} htmlFor="city">Authorized Representative Contact Information:</label><br />
                <input className={`${styles.inputField} p-2 w-full border border-gray-300 rounded mt-1`} type="text" id="city" name="city" required /><br /><br />
              </div>
            </div>
          }

          <div className=" mt-5 col-span-2 text-center">
            <button type="button" className={`${styles.button} px-4 py-2 bg-gray-500 text-white font-semibold rounded mx-2`}>
              Show Preview
            </button>
            <button type="submit" className={`${styles.button} px-4 py-2 bg-green-500 text-white font-semibold rounded mx-2`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default ClaimProperty