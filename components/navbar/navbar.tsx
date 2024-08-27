import Link from 'next/link';
import styles from './navbar.module.scss';

const Navbar = () => {
    return (
      <nav className={`${styles.navbar} flex items-center justify-between p-4`}>
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-6 text-lg">
            Dashboard
          </Link>
          <Link href="/reportfound" className="mr-6">
            Report Found
          </Link>
          <Link href="/productlist" className="mr-6">
            Product List
          </Link>
          <Link href="/aboutus" className="mr-6">
            About Us
          </Link>
          <Link href="/policy" className="mr-6">
            Policy
          </Link>
        </div>
        <div className="flex items-center">
          <p className='me-3'>User Name </p>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;