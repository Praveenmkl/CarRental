import React, { useState } from 'react';
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState(null);

  const updateImage = () => {
    if (image) {
      user.image = URL.createObjectURL(image);
      setImage(null);
    }
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

      {/* Profile Image Upload */}
      <div className='group relative w-24 h-24'>
        <label htmlFor='image' className='cursor-pointer'>
          <img
            src={image ? URL.createObjectURL(image) : user?.image || 'https://unsplash.com/photos/parked-white-ford-explorer-suv-a4S6KUuLeoM'}
            alt="Profile"
            className='w-24 h-24 object-cover rounded-full border'
          />
          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* Hover Overlay */}
          <div className='absolute inset-0 bg-black/10 rounded-full hidden group-hover:flex items-center justify-center'>
            <img src={assets.edit_icon} alt="Edit" className='w-5 h-5' />
          </div>
        </label>

        {/* Save Button */}
        {image && (
          <button
            onClick={updateImage}
            className='absolute -top-2 -right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center gap-1'
          >
            Save
            <img src={assets.check_icon} width={13} alt="Check" />
          </button>
        )}
      </div>

      {/* User Name */}
      <p className='mt-3 text-base max-md:hidden'>{user?.name}</p>

      {/* Sidebar Links */}
      <div className='w-full mt-6'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 ${
              link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={`${link.name} icon`}
            />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='bg-primary w-1.5 h-8 rounded-l absolute right-0'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
