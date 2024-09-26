'use client'
import Link from "next/link";
import "./navbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImage from '../../app/assets/zool-logo-black-brand.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'
import { clearLocalStorage } from "@/app/services/coreServices";
import { DeleteAllCookies } from "@/app/services/authServices";

const Navbar = () => {
  const router = useRouter();
  const role = useSelector((state: RootState) => state.role.role)
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const userName = userDetails && userDetails?.user_name;
  console.log(userDetails);
  const handleLogout = () => {
    clearLocalStorage();
    DeleteAllCookies();
    router.push('/login');

  }
  return (
    <nav className="navbar flex items-center justify-between p-4">
      <div className="flex items-center">
        <Image src={logoImage} alt="" width={100} height={100} />
      </div>
      <div className="flex items-center nav-link">
        <Link href="/dashboard" className="mr-6">
          Dashboard
        </Link>
        <Link href="/reportfound" className="mr-6">
          Report Found
        </Link>
        <Link href="/productlist" className="mr-6">
          Product List
        </Link>
        <Link href='/claimstatus' className="mr-6">Claim Status</Link>
      </div>
      <div className="flex items-center">
        <Link href="/admintool" className="mr-6">
          Admin Tools
        </Link>
        <Link href='/profile'>
          <p className="me-3 text-deep-purple-900 font-semibold"> {userName?.toUpperCase()} | {role?.toUpperCase()} </p>
        </Link>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
