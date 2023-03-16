import React from 'react'
import Order from '@/Models/Order';
import connectToMongo from '../Middlewares/mongoose'

const MyOrders = ({Orders}) => {
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl text-center font-bold mb-4">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Order #</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">12345</td>
              <td className="border px-4 py-2">01/01/2022</td>
              <td className="border px-4 py-2">$100.00</td>
              <td className="border px-4 py-2">Processing</td>
              <td className="border px-4 py-2"><a href="#" className="text-blue-500 font-bold">View Details</a></td>
            </tr>
            <tr>
              <td className="border px-4 py-2">12346</td>
              <td className="border px-4 py-2">01/02/2022</td>
              <td className="border px-4 py-2">$200.00</td>
              <td className="border px-4 py-2">Shipped</td>
              <td className="border px-4 py-2"><a href="#" className="text-blue-500 font-bold">View Details</a></td>
            </tr>
            <tr>
              <td className="border px-4 py-2">12347</td>
              <td className="border px-4 py-2">01/03/2022</td>
              <td className="border px-4 py-2">$300.00</td>
              <td className="border px-4 py-2">Delivered</td>
              <td className="border px-4 py-2"><a href="#" className="text-blue-500 font-bold">View Details</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  connectToMongo(); //checking database connnection
  let Orders = await Order.find({  })
  
  return {
    props: { Orders: JSON.parse(JSON.stringify(Orders)) }, // will be passed to the page component as props
  }
}

export default MyOrders;