import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
// import { SessionProvider ,signOut ,useSession} from "next-auth/react";




export default function App({ Component, pageProps }) {

 
  const router = useRouter();


  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [progress, setProgress] = useState(0)


  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

  }, [])


  useEffect(() => {
    console.log("useeffect from tokem")
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }

  }, [router.query]);



  const Logout = async () => {
    await localStorage.removeItem('authToken')
    setIsLoggedIn(false);
    router.push('/')
    toast.success('Logged out', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("logout")
  }


 




  //this is the sample code of the cart object how it will look
  //   const cart = {
  //     "productid": {
  //         "name": "Product 1",
  //         "price": 20,
  //         "qty": 2,
  //         "size": "M",
  //         "variant": "blue"


  //     },
  //     "productid": {
  //         "name": "Product 2",
  //         "price": 30,
  //         "qty": 1,
  //         "size": "M",
  //         "variant": "blue"
  //     },
  //     "productid": {
  //         "name": "Product 3",
  //         "price": 40,
  //         "qty": 3,
  //         "size": "M",
  //         "variant": "blue"
  //     }
  // }

  //using this useeffect to store the items in cart after page load and exit also
  //By using useEffect with an empty dependency array ([]), this code ensures that the cart data is loaded only once, when the component is first mounted, and not every time the component re-renders. This helps to prevent unnecessary API calls or other side effects caused by repeatedly loading the same data.
  useEffect(() => {
    console.log("useEffect is running from _app.js")
    try {
      if (localStorage.getItem('cart')) {
        setcart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }

  }, [])


  //using this useEffect to store subtotal and other data after page refresh also
  useEffect(() => {
    console.log("useeffect from savecrt and subtotal")
    saveCart(JSON.parse(localStorage.getItem('cart')))
  }, [])


  // save cart function to save items in local storage
  const saveCart = async (newCart) => {
    await localStorage.setItem('cart', JSON.stringify(newCart));
    let subt = calculateSubtotal(newCart)
    setsubtotal(subt);
  }


  //calculating the subtotal for the items in cart
  const calculateSubtotal = (newCart) => {
    let subt = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]].price * newCart[keys[i]].qty
    }
    return subt;
  }


  // function to add items to cart
  // const addToCart = (productid, name, qty, price, size, variant) => {
  //   let newCart = { ...cart };// creating a new copy of the object and make changes to that copy instead of modifying the original object.
  //   // let newCart = cart;  // creating a new variable newCart and assigning the current cart state to it.we can directly update the cart state without creating a new variable, but it's a best practice to create a new variable and update it
  //   if (productid in cart) {
  //     newCart[productid].qty += qty;
  //   }
  //   else {
  //     newCart[productid] = { qty: 1,  name, qty, price, size, variant }
  //   }
  //   setcart(newCart);
  //   console.log(newCart);
  //   saveCart(newCart);
  // }





  //   const addToCart = (variantKey, name, qty, price, size, color) => {
  //     const newCart = { ...cart };

  //     if (variantKey in newCart) {
  //         newCart[variantKey].qty += qty;
  //     } else {
  //         newCart[variantKey] = { productId: variantKey.split("-")[0], name, qty, price, size, color };
  //     }

  //     setcart(newCart);
  //     console.log(newCart);
  //     saveCart(newCart);
  // };








  // <AiFillPlusCircle onClick={() => { addToCart(productid, cart[productid].name, 1, cart[productid].price, cart[productid].size, cart[productid].variant) }} className='cursor-pointer text-lg text-green-600' /><span className='mx-2'>{cart[productid].qty}</span>

  // { addToCart(Product._id, `${Product.product_name} (${selectedSize}/${capitalizeFirstLetter(selectedColor)})`, 1, Product.price, selectedSize, selectedColor) }}




  // const addToCart = (productId, name, qty, price, size, color) => {
  //   const itemKey = `${name} (${size}/${color})`;
  //   const newCart = { ...cart };

  //   if (itemKey in newCart) {
  //     newCart[itemKey].qty += qty;
  //   } else {
  //     newCart[itemKey] = { productId, name, qty, price, size, color };
  //   }

  //   setcart(newCart);
  //   saveCart(newCart);
  // };


  const addToCart = (productId, name, qty, price, size, color) => {
    try {
      const variantKey = `${productId}-${color}-${size}`;
      console.log(variantKey);

      const newCart = { ...cart };
      if (variantKey in newCart) {
        newCart[variantKey].qty += qty;
      } else {
        newCart[variantKey] = { productId, name, qty, price, size, color };
      }
      setcart(newCart);
      console.log(newCart);
      saveCart(newCart);
      toast.success(' Product added to cart', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (error) {
      toast.error('Sorry !Some error occured', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };



  // clear cartitems function
  const clearCart = () => {
    setcart({})
    saveCart({})
  }



  // remove products from cart function
  const removeFromCart = (productId, name, qty, price, size, color) => {
    const variantKey = `${productId}-${color}-${size}`;
    let newCart = { ...cart };
    if (variantKey in cart) {
      newCart[variantKey].qty -= qty
    }
    if (newCart[variantKey].qty <= 0) {
      delete newCart[variantKey]
    }
    setcart(newCart);
    saveCart(newCart)
  }



  // const buyNow = async (productId, name, qty, price, size, color) => {
  //   setcart({})

  //   console.log(cart)
  //   await localStorage.setItem('cart', JSON.stringify({}));
  //   console.log(cart)

  //   let newCart = {productId, name, qty, price, size, color}
  //   const variantKey = `${productId}-${size}-${color}`;
  //   newCart[variantKey] = { productId, name, qty, price, size, color };
  //   setcart(newCart)
  //   console.log(newCart);
  //   saveCart(newCart)
  //   router.push('/Checkout');
  // }


  const buyNow = async (productId, name, qty, price, size, color) => {
    // Clear the cart by setting it to an empty object
    setcart({});
    console.log(cart);
    // Create a new cart object with the provided data
    const newCart = {
      [`${productId}-${color}-${size}`]: {
        productId,
        name,
        qty,
        price,
        size,
        color,
      },
    };

    // Update the cart state with the new cart object
    setcart(newCart);
    console.log(newCart);
    // Save the new cart object to local storage
    localStorage.setItem('cart', JSON.stringify(newCart));
    let subt = calculateSubtotal(newCart)
    setsubtotal(subt);

    // Redirect the user to the checkout page
    router.push('/Checkout');
  }



  return <>
  {/*<SessionProvider session={pageProps.session}>*/}

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

    <LoadingBar
      color='#f11946'
      height={2}
      progress={progress}
      waitingTime={500}
      onLoaderFinished={() => setProgress(100)}
    />
    <Navbar Logout={Logout} isLoggedIn={isLoggedIn} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    
    <Component isLoggedIn={isLoggedIn} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer />
    
  {/*</SessionProvider>*/}
  </>

}


 ///the Navbar component, Component prop, and Footer component are all //wrapped together and returned, ensuring that they will all be rendered together on every page.
