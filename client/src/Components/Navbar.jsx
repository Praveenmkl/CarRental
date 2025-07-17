import React, { useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets';
import { menuLinks } from '../assets/assets';
import '../index.css';


const Navbar = ({setShowLogin}) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5  text-gray-700 shadow-sm relative transition-all ${location.pathname === "/" ? "bg-blue-50" : "bg-blue-50"}`}>
      
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <img src={assets.logo} alt='Logo' className='h-9' />
       
      </Link>

      {/* Desktop Menu */}
      <div className='hidden lg:flex items-center gap-8 text-md'>
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} className='hover:text-primary'>{link.name}</Link>
        ))}

        {/* Search Box */}
        <div className='flex items-center border border-gray-500 rounded-full px-3'>
          <input
            className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
            type='text'
            placeholder='Search products'
          />
          <img src={assets.search_icon} alt='Search' className='w-4 h-4' />
        </div>

        <Link to="/dashboard" className='text-md'>Dashboard</Link>

        <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg w-24 transition-all cursor-pointer'>
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className='lg:hidden cursor-pointer' onClick={() => setOpen(!open)} aria-label='Menu'>
        <img src={open ? assets.close_icon : assets.menu_icon} alt='menu' />
      </button>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-white z-50 shadow-md p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className='absolute top-4 right-4' onClick={() => setOpen(false)}>
          <img src={assets.close_icon} alt="close" className="w-5 cursor-pointer" />
        </button>

        <div className="flex flex-col mt-12 gap-5 text-sm">
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path} className='hover:text-blue-600' onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}

          <Link to="/dashboard"  onClick={() => setOpen(false)}>Dashboard</Link>

          <button
            onClick={() => setOpen(false)}
            className='mt-4 bg-blue-700 hover:bg-blue-600 text-white px-8 py-2.5 rounded-md w-24 cursor-pointer'
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
