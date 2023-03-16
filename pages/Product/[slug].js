import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Product from '@/Models/Product'
import connectToMongo from '../../Middlewares/mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ buyNow, addToCart, Product, variants }) => {

  //function to capitalize the first letter 
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const router = useRouter();
  const { slug } = router.query;


  //setting pincode using useState and checking if it is Serviceable or not
  const [pin, setpin] = useState()
  const [isPincodeServiceable, setisPincodeServiceable] = useState()
  //function to check pincode availabele or not

  const checkpincodeavailability = async () => {   //true and false values are being used here as boolean values to represent whether the entered pin is serviceable or not, and to update the state accordingly.//
    setisPincodeServiceable(null)  //  reset the value of "service" variable to null before checking a new pincode by making api call //
    let availablePins = await fetch(`${process.env.HOST}/api/pincode`)
    let pinjson = await availablePins.json()

    if (pinjson.includes(parseInt(pin))) {
      setisPincodeServiceable(true)
      toast.success(' yay !Pincode is serviceable', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }
    else {
      setisPincodeServiceable(false)
      toast.error('Sorry !Pincode is not serviceable', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }
  }

 

  //onchange of text field//
  const onChangePin = async (event) => {
    event.preventDefault();
    console.log("onChangePin was clicked")
    setpin(event.target.value)
  }

  const defaultColor = Product.colors.length > 0 ? Product.colors[0].color : "";
  const defaultSize = Product.colors.length > 0 && Product.colors[0].sizes.length > 0 ? Product.colors[0].sizes[0].size : "";


  //useState hook to change the color and size of product 
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setselectedSize] = useState(defaultSize);

 

  const handleColorClick = (color) => {
    setSelectedColor(color);
    console.log(color)
  };



  const handleSizeClick = (size) => {
    setselectedSize(size);
    console.log(size)
  };


  const sizes = selectedColor
    ? Product.colors.find(color => color.color === selectedColor).sizes
    : [];

     //function to refresh the page once user clicks the color and size of tshirt
  // const refreshVariant = (selectedColor, selectedSize) => {
  //   let url = `http://localhost:3000/Product/${Product.slug}-${selectedColor}-${selectedSize}`
  //   console.log(slug)
  //   window.location = url;
  // }



  // const buyNow = async () => {
  //   await clearCart();
  //   addToCart(Product._id, `${Product.product_name} (${selectedSize}/${capitalizeFirstLetter(selectedColor)})`, 1, Product.price, selectedSize, selectedColor);
  //   router.push("/Checkout")

  // }



  //If selectedColor is truthy (i.e. not null, undefined, false, 0, NaN, or an empty string), then Product.colors.find(color => color.color === selectedColor) will return the first object in the array that has a color property equal to selectedColor


  //we will take the pin input from user and then setpin state and check if the pins are avaialbele or not//


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <div key={Product.slug} className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={Product.default_img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{Product.product_name}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{`${Product.product_name} (${selectedSize}/${capitalizeFirstLetter(selectedColor)})`}</h1>

            <p className="leading-relaxed">{Product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Colors</span>
                {Product.colors.map(color => (

                  <div key={color.color} className=" relative inline-block text-center"><button onClick={() => handleColorClick(color.color) } className={`border-2  outline-gray-500 border-gray-300 ml-1 ${color.color === "black" ? "bg-black" : `bg-${color.color}-700`} rounded-full  w-6 h-6 focus:outline-none`} style={selectedColor === color.color ? { outline: '2px solid black'} : null}></button></div>
                ))}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">

                  {sizes.map(size => (
                    <button onClick={() => handleSizeClick(size.size)} key={size.size} className={`mx-2 border-black dark:border-white rounded-lg border px-2`} style={selectedSize === size.size ? { backgroundColor: '#6366f1' ,color: 'white' } : null}>{size.size}</button>

                  ))}

                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">&#8377;{Product.price}</span>

              <button onClick={() => { buyNow(Product._id, `${Product.product_name} (${selectedSize}/${capitalizeFirstLetter(selectedColor)})`, 1, Product.price, selectedSize, selectedColor) }} className="flex ml-4 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>

              <button onClick={() => { addToCart(Product._id, `${Product.product_name} (${selectedSize}/${capitalizeFirstLetter(selectedColor)})`, 1, Product.price, selectedSize, selectedColor)  } }  className="flex ml-4 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Add to cart</button>

            </div>

            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} value={pin} className="border-2  px-2 border-gray-400" placeholder="Enter your Pincode" type="text" />
              <button onClick={checkpincodeavailability} className=' text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded'>Check pincode availability</button>
            </div>


           {/*{(isPincodeServiceable && isPincodeServiceable != null) && <div className="text-sm text-green-500 mt-3">
              Yay! this pincode is serviceable
            </div>}
            {(!isPincodeServiceable && isPincodeServiceable != null) && <div className="text-sm text-red-600 mt-3">
              sorry ! we do not deliver here
                  </div>}*/}

          </div>
        </div>
      </div>
    </section>




    /*<section className="text-gray-600 body-font overflow-hidden">
      {Products.map(product => {
        return <div key={product.slug} className="container px-5 py-16 mx-auto">

          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-3 object-cover object-top rounded" src="https://m.media-amazon.com/images/I/517gqlQ5kJL._UY741_.jpg" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">PUMA</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>

              <p className="leading-relaxed">desc</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {product.colors.map(color => (
                    <div key={color.color} className=" relative inline-block  text-center"><button className={`border-2 border-gray-300 ml-1 ${color.color === "black" ? "bg-black" : `bg-${color.color}-700`} rounded-full w-6 h-6 focus:outline-none`}></button></div>
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">

                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">&#8377; {product.price}</span>
                <button className="flex ml-4 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                <button onClick={() => { addToCart(slug, "brown-kurta(L,Red)", 1, 499, "L", "Red") }} className="flex ml-4 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Add to cart</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="pin mt-6 flex space-x-2 text-sm">
                <input onChange={onChangePin} value={pin} className="border-2  px-2 border-gray-400" placeholder="Enter your Pincode" type="text" />
                <button onClick={checkpincodeavailability} className=' text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded'>Check pincode availability</button>
              </div>

              
              {(service && service != null) && <div className="text-sm text-green-500 mt-3">
                Yay! this pincode is serviceable
              </div>}
              {(!service && service != null) && <div className="text-sm text-red-600 mt-3">
                sorry ! we do not deliver here
              </div>}

            </div>
          </div>
        </div>
      })}
    </section>*/

  )
}


export async function getServerSideProps(context) {
  connectToMongo(); //checking database connnection
  let Products = await Product.findOne({ slug: context.query.slug })
  console.log(Products)
  return {
    props: { Product: JSON.parse(JSON.stringify(Products)) }, // will be passed to the page component as props
  }
}







// let Product = await Product.findOne({slug: context.query.slug });  //ek single product yaha return hoga
// console.log(product);
// //ab jsipe click kiya uska slug to milgya but us slug ka kitan tshirt hai wo lana hai
// let variants = await Product.find({product_name: product.product_name })   // yaha wo jo product upar mila uska name dekhege waisa same name jo hai sab milega result
// console.log(variants)
// let colorsizeSlug = { };  //{/* red: { Xl: { slug:"puma-sport-XL"} } */}
// for (let item of variants) {
//   if (Object.keys(colorsizeSlug).includes(item.color)) {
//     colorsizeSlug[item.color][item.size] = {slug: item.slug }    //Black: {L: {slug: 'adidas-sports2' } }
//   }
//   else {
//     colorsizeSlug[item.color] = { };
//     colorsizeSlug[item.color][item.size] = {slug: item.slug }
//   }
// }

// console.log(colorsizeSlug);

// return {
//   props: {variants: JSON.parse(JSON.stringify(colorsizeSlug)), product: JSON.parse(JSON.stringify(product)) } // will be passed to the page component as props
// }


export default Slug;