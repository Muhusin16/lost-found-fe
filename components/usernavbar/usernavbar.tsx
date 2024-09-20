'use client'
import Link from "next/link";
import styles from './usernavbar.module.scss';
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImage from '../../app/assets/zool-logo-black-brand.png';
import '../../app/styles/app.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import { clearLocalStorage } from "@/app/services/coreServices";
import { DeleteAllCookies } from "@/app/services/authServices";

const UserNavbar = () => {
  const router = useRouter();
  const role = useSelector((state: RootState) => state.role.role)
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const userName = userDetails?.user_name;

  const handleLogout = () => {
    clearLocalStorage();
    DeleteAllCookies();
    router.push('/login');
  }

  return (
    <nav className={`${styles.navbar} flex items-center justify-between p-4`}>
      <div className="flex items-center">
        <Image src={logoImage} alt="" width={100} height={100} />
      </div>
      <div className={`${styles.navLink} flex items-center`}>
        <Link href="/user/dashboard" className="mr-6">
          Dashboard
        </Link>
        <Link href="/user/claimrequest" className="mr-6">
          Claim Request
        </Link>
        {/* <Link href="/productlist" className="mr-6">
          Product List
        </Link> */}
      </div>
      <div className="flex items-center">
        <Link href="/user/userprofile" className="mr-6">
          <p className="me-3  text-deep-purple-900 font-semibold"> {userName?.toUpperCase()} | {role?.toUpperCase()} </p>
        </Link>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
