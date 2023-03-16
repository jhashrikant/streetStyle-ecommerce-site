import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Link from "next/link";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ addToCart, removeFromCart, cart, subtotal }) => {
  return (
    <div className="container mx-auto px-10">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="m-auto text-xl font-serif">1.Delivery Details</h2>
      <div className="container mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="30"
            rows="2"
          ></textarea>
        </div>
      </div>
      <div className="container mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="State" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="State"
              name="State"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="m-auto font-serif text-xl">2.View Order Summary</h2>
      {/* order summary below*/}
      <div className={` p-6 my-8 bg-indigo-50`}>
        <h2 className=" font-bold text-center"></h2>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font font-semibold">No items in cart</div>
          )}
          {Object.keys(cart).map((productid) => {
            return (
              <li key={productid}>
                {" "}
                {/* array.map for every productid in the array */}
                <div className="item flex my-3">
                  <div className="w-2/3 font-semibold">
                    {cart[productid].name}
                  </div>
                  <div className="flex w-1/3 font-semibold items-center justify-center">
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          productid,
                          cart[productid].name,
                          1,
                          cart[productid].price,
                          cart[productid].size,
                          cart[productid].variant
                        );
                      }}
                      className="cursor-pointer text-lg text-green-600"
                    />
                    <span className="mx-2">{cart[productid].qty}</span>
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          productid,
                          cart[productid].name,
                          1,
                          cart[productid].price,
                          cart[productid].size,
                          cart[productid].variant
                        );
                      }}
                      className="cursor-pointer text-lg"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total">Subtotal : &#8377; {subtotal}</span>
      </div>
      <div className="flex">
        <Link href="/Checkout">
          <button className="flex mr-2  text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm ">
            <BsFillBagCheckFill className="m-1" />
            Pay &#8377;{subtotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
