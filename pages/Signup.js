import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Signup = () => {

	const router = useRouter();

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			router.push('/')
		}
	}, [])

	const [formData, setformData] = useState(
		{
			name: '',
			email: '',
			password: ''
		}
	);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const { name, email, password } = formData;
		const response = await fetch(`${process.env.HOST}/api/Signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});
		const data = await response.json();
		console.log(data)
		setformData({
			name: "",
			email: "",
			password: "",
		})
		toast.success('Account created successfully ', {
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


	const handleOnchange = (event) => {
		console.log("onchange")
		setformData({ ...formData, [event.target.name]: event.target.value })
	}


	return (
		<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<ToastContainer
				position="top-left"
				autoClose={5000}
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
					<div className="logo mb-5 text-center text-red-400 text-xl">
						streetStyle.com
					</div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Create an account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or
						<Link
							href={"/Login"}
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							{" "}
							Login
						</Link>
					</p>
				</div>
				<form onSubmit={handleFormSubmit} className="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" value="true" />
					<div className="-space-y-px rounded-md shadow-sm">

						<div>
							<label htmlFor="name" className="sr-only">Name</label>
							<input onChange={handleOnchange} value={formData.name} id="name" name="name" type="text" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="Name" />
						</div>

						<div>
							<label htmlFor="email-address" className="sr-only">Email address</label>
							<input onChange={handleOnchange} value={formData.email}
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="Email address" />
						</div>

						<div>
							<label htmlFor="password" className="sr-only">Password</label>
							<input onChange={handleOnchange} value={formData.password}
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="Password" />
						</div>
					</div>

					<div>
						<button
							type="submit" value="Submit"
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
