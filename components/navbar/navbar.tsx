'use client'
import Link from "next/link";
import "./navbar.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImage from '../../app/assets/zool-logo-black-brand.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store/store'

const Navbar = () => {
  const router = useRouter();
  const role = useSelector((state:RootState) => state.role.role)
  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  console.log(userDetails);
  const handleLogout = () => {
    localStorage.setItem('token', '');
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
        {/* <Link href="/aboutus" className="mr-6">
          About Us
        </Link>
        <Link href="/policy" className="mr-6">
          Policy
        </Link> */}
      </div>
      <div className="flex items-center">
      <Link href="/admintool" className="mr-6">
          Super Admin
        </Link>
        <p className="me-3">User Name | {role} </p>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
