import React, { useRef, useState } from 'react'
import Link from "next/link";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';


// import styles from '../styles/navbar.module.css'

const Navbar = ({ Logout, isLoggedIn, cart, addToCart, removeFromCart, clearCart, subtotal }) => {

  console.log(cart)

  const [dropDown, setdropDown] = useState(false)

  // const toggleDropDown = () => {
  //   setdropDown(dropDown => {
  //     return !dropDown;
  //   })
  // }


  const [isActive, setIsActive] = useState(false);

  const togglecart = () => {
    setIsActive(prevIsActive => {
      return !prevIsActive;
    });
  };





  //When you call setIsActive with a function as an argument, React passes the current value of isActive to that function. The function then returns the new value for isActive. 

  //updating the state using a callback function which takes the value if prevstate is true then return false and viceversa// 

  //useRef hook to give ref to button
  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-5 bg-slate-50 shadow-xl sticky top-0 z-10">
      <div className="logo mx-5 mr-auto md:mx-5 text-indigo-500 text-xl">
        <Link href={"/"}>streetStyle.com</Link>
        {/*<Image src="/logo.jpg" width={100} height={40} alt=""></Image>*/}
      </div>
      <div className="nav">
        <nav>
          <ul className="flex items-center space-x-7 font-bold text-sm">
            <Link href={"/Tshirts"}><li>Tshirts</li></Link>
            <Link href={"/Hoodies"}><li>Hoodies</li></Link>
            <Link href={"/Stickers"}><li>Stickers</li></Link>
            <Link href={"/Mugs"}><li>Mugs</li></Link>
          </ul>
        </nav>
      </div>







      <div className="cart flex justify-center absolute items-center right-0 top-5 mx-4 text-xl">

        {dropDown && <div onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)} className="absolute right-5 z-10 top-3 w-40 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"
        >

          <div className="py-1" role="none">
            <Link href={"/MyAccount"} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">My Account</Link>
            <Link href={"/MyOrders"} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Orders</Link>
            <button onClick={Logout} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Logout</button>

          </div>
        </div>}

        <div>{isLoggedIn ? <MdAccountCircle onMouseOver={() => setdropDown(true)}
          onMouseLeave={() => setdropDown(false)} className='mx-2 cursor-pointer' /> : <Link href={"/Login"}><button className="mx-2 bg-indigo-500 text-white px-2 py-1 rounded-md text-sm font-normal hover:bg-indigo-600">Login</button></Link>}</div>
        <div><AiOutlineShoppingCart onClick={togglecart} className=' cursor-pointer' /></div>
      </div>





      {/* cart sidebar below*/} {/* ternary operator=> condition ? value_if_true : value_if_false*/}

      <div ref={ref} className={`sideCart ${isActive ? "active" : ""} w-80 fixed overflow-y-scroll py-10 px-8 bg-indigo-50`}>
        <h2 className=" font-bold text-center">Shopping cart</h2>
        <span onClick={togglecart} className="absolute top-5 right-2 cursor-pointer text-xl"><AiFillCloseCircle className="cursor-pointer" /></span>
        <ol className="list-decimal font-semibold">

          {cart && Object.keys(cart).length === 0 && <div className="my-4 font font-semibold">No items in cart</div>}
          {Object.keys(cart).map((variantKey) => {
            const { productId, name, qty, price, size, color } = cart[variantKey];
            console.log(variantKey)

            return <li key={variantKey}>    {/* array.map for every variantKey in the array */}
              <div className="item flex my-3">
                <div className='w-2/3 font-semibold'>{name}</div>
                <div className='flex w-1/3 font-semibold items-center justify-center'>
                  <AiFillPlusCircle onClick={() => { addToCart(productId, name, 1, price, size, color) }} className='cursor-pointer text-lg text-green-600' /><span className='mx-2'>{qty}</span><AiFillMinusCircle onClick={() => { removeFromCart(productId, name, 1, price, size, color) }} className='cursor-pointer text-lg' /></div>
              </div>
            </li>
          })}
        </ol>
        <span className='total font-bold'>Subtotal : &#8377; {subtotal}</span>

        <div className="flex">
          <Link href="/Checkout"><button className="flex mr-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm "><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
          <button onClick={clearCart} className="flex mr-2 mt-6 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm ">Clear cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;