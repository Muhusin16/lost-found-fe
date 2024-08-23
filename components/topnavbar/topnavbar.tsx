"use client"
import React from 'react';
import styles from './TopNavBar.module.scss';
import logo from '../../app/assets/log.png'
import Image from 'next/image';
import Link from 'next/link';

const TopNavBar = () => {
  return (
    <div className='flex flex-col '>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Image src={logo} alt="Logo" className={styles.logo} width={50} height={200} />
          <input type="text" className={styles.searchBar} placeholder="Country" />
        </div>
        <div className={styles.navbarRight}>
          <input type="text" className={styles.searchBar} placeholder="Search" />
          <select className={styles.languageSelector}>
            <option>English</option>
          </select>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
          <div className={styles.notificationIcon}>
            <span className={styles.bellIcon}>&#x1F514;</span>
          </div>
          <div className={styles.userIcon}>
            <span>Employee Name</span>
            <div className={styles.profilePic}></div>
          </div>
        </div>
      </nav>
      <nav className={styles.navbar}>
        <div className={styles.navbarCenter}>
          <Link href="/admin/foundreport" className={styles.navLink}>Report Lost</Link>
          <Link href="/admin/foundreport" className={styles.navLink}>Report Found</Link>
          <Link href="/admin/productlist" className={styles.navLink}>Product List</Link>
          <Link href="/admin/aboutus" className={styles.navLink}>About Us</Link>
          <Link href="/admin/policy" className={styles.navLink}>Policy</Link>
        </div>
      </nav>

    </div>
  );
};

export default TopNavBar;Link