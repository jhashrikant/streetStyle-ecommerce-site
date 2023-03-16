import React, { useState ,useEffect } from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
// import { signIn ,signOut ,useSession} from "next-auth/react"




const Login = () => {



  // const signInwithGoogle = async ()=>{
  //   signIn('google',{callbackUrl: 'http://localhost:3000'})
  // }

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push(process.env.HOST)
    }
  }, [])


  
  //useState hook to collect user data
  const [formData, setformData] = useState(
    {
      email: '',
      password: '',
    }
  )

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('onchange was clicked');
    const { email, password } = formData;
    const res = await fetch(`${process.env.HOST}/api/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const response = await res.json();

    setformData({
      email: '',
      password: '',
    })

    if (response.success) {
      localStorage.setItem('authToken', response.authToken)

      toast.success('Logged in successfully ', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(process.env.HOST)
      }, 1000);

    }
    else {
      toast.error('Invalid credentials ', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const handleOnchange = (event) => {
    console.log('onchange was clicked');
    setformData(
      {
        ...formData,  //// Copy the existing "formData" object
        [event.target.name]: event.target.value   // event.target.name refers to the name attribute of the input element that triggerd the event and we event.target.value refers to the value property of the form input element that triggered the event. This property contains the current value of the input element, which may have been changed by the use .The square brackets [event.target.name] are used to dynamically set the key of the formData object
      }
    )
  }

 
  //In this code, the formData state is initialized as an object with name and email properties. When the handleInputChange() function is called, it uses the spread operator to create a new object with the updated property, and then passes that object to setFormData(). React will update the state of the component with the new object and trigger a re-render with the updated state.



  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <ToastContainer
        position="top-left"
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

      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="logo mb-5 text-center text-red-400 text-xl">streetStyle.com</div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href={"/Signup"} className="font-medium text-indigo-600 hover:text-indigo-500"> create account</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input onChange={handleOnchange} value={formData.email} id="email" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={handleOnchange} value={formData.password} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div className="text-sm">
              <Link href={"/Forgot"} className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
            </div>
          </div>

          <div>
            <button type="submit" value="Submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              Log in
            </button>
          </div>

          <div className="flex items-center my-4 behtmlFore:flex-1 behtmlFore:border-t behtmlFore:border-gray-300 behtmlFore:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" >
            <p className="text-center font-semibold mx-4 mb-0">Or Continue with</p>
          </div>
          <div className="flex flex-row items-center justify-center lg:justify-center">

            <button 
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-blue-600 text-white font-medium text-xl leading-tight hover:bg-blue-700 uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1">

              {/* Google */}
              <AiFillGoogleCircle />
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1" >
              {/* Facebook */}
              <BsFacebook />
            </button>

            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-blue-600  text-white font-medium text-xl leading-tight uppercase rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1" >

              { /*twitter */}
              <BsTwitter />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;