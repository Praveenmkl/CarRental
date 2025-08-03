import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../../assets/assets'
import Title from '../../Components/owner/Title'

const ManageBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || 'LKR'
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data with delay
    setTimeout(() => {
      setBookings(dummyMyBookingsData)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title='Manage Bookings'
        subTitle='Track all customer bookings, approve or cancel requests, and manage booking statuses.'
      />

      {loading ? (
        <div className='text-center text-gray-500 mt-10'>Loading bookings...</div>
      ) : (
        <div className='max-w-5xl w-full rounded-md overflow-x-auto border border-borderColor mt-6'>
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
            <thead className='text-gray-500 bg-gray-50'>
              <tr>
                <th className='p-3 font-medium'>Car</th>
                <th className='p-3 font-medium max-md:hidden'>Date Range</th>
                <th className='p-3 font-medium'>Total</th>
                <th className='p-3 font-medium max-md:hidden'>Payment</th>
                <th className='p-3 font-medium'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}

              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className='border-t border-borderColor text-gray-600'
                >
                  <td className='p-3 flex items-center gap-3'>
                    <img
                      src={booking.car?.image || assets.car_placeholder}
                      alt={`${booking.car?.brand || 'Car'} ${booking.car?.model || ''}`}
                      className='h-12 w-12 rounded-md object-cover'
                    />
                    <p className='font-medium max-md:hidden'>
                      {booking.car?.brand || 'Brand'} {booking.car?.model || ''}
                    </p>
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {booking.pickupDate
                      ? new Date(booking.pickupDate).toLocaleDateString()
                      : 'N/A'}{' '}
                    to{' '}
                    {booking.returnDate
                      ? new Date(booking.returnDate).toLocaleDateString()
                      : 'N/A'}
                  </td>

                  <td className='p-3'>
                    {currency} {booking.price || '0'}
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {booking.status
                      ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                      : 'Pending'}
                  </td>

                  <td className='p-3'>
                    <button className='text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-all'>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageBooking

