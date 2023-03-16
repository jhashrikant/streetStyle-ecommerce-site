import React from 'react'
import Link from "next/link";
import styles from '../styles/tshirts.module.css'
import Product from '@/Models/Product';
import connectToMongo from '../Middlewares/mongoose'


const Tshirts = ({ Products }) => {

  console.log(Products)

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-">
          {Products && Products.length === 0 && <p>No products in stock.new stock coming soon</p>}
            {Products.map((product => {
              return <div key={product.slug} className={`lg:w-1/4 md:w-1/2 ${styles.smallwidth} p-4 w-full px-4 my-2`}>
                <Link href={`./Product/${product.slug}`}>

                  <div className="block relative h-80 rounded-3xl shadow-sm border border-solid border-slate-300 overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-ce sm:w-1/2nter w-full h-full block" src={product.default_img} />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.product_name}</h2>
                    <p className="mt-1">&#8377;{product.price}</p>
                  </div>
                  <div className="flex items-center justify-center mt-1">

                    {product.colors.map(color => (
                      <div key={color.color} className=" relative inline-block  text-center"><button className={`border-2 border-gray-300 ml-1 ${color.color === "black" ? "bg-black" : `bg-${color.color}-700`} rounded-full w-6 h-6 focus:outline-none`}></button></div>
                    ))}
                    
                  </div>
                </Link>
              </div>
            }))}

            {/*{Object.keys(Products).map((product) => {
              return <div key={Products[product]._id} className={`lg:w-1/4 md:w-1/2 ${styles.smallwidth} p-2 w-full px-4  my-2`}>
                <Link href={`./Product/${Products[product].slug}`}>
                  <div className="block relative h-80 rounded-3xl shadow-sm border border-solid border-slate-300 overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-ce sm:w-1/2nter w-full h-full block" src={Products[product].image} />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{Products[product].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{Products[product].product_name}</h2>
                    <p className="mt-1">&#8377; {Products[product].price}</p>
                    <div className="mt-1">
                      {Products[product].size.includes('S') && <span className="border px-1 mx-1">S</span>}
                      {Products[product].size.includes('M') && <span className="border px-1 mx-1">M</span>}
                      {Products[product].size.includes('L') && <span className="border px-1 mx-1">L</span>}
                      {Products[product].size.includes('XL') && <span className="border px-1 mx-1">XL</span>}
                      {Products[product].size.includes('XXL') && <span className="border px-1 mx-1">XXL</span>}
                    </div>

                    <div className="mt-1">
                      {Products[product].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Products[product].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Products[product].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Products[product].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>
            })}*/}

          </div>
        </div>
      </section>
    </div>
  )
}



// export async function getServerSideProps(context) {
//   connectToMongo(); //checking database connnection
//   let Products = await Product.find({ category: "Tshirts" })  //retrieves all the documents from the Product collection using the find() method
//   let tshirts = {}
//   for (let item of Products) {
//     if (item.product_name in tshirts) {
//       if (!tshirts[item.product_name].color.includes(item.color) && item.availableQty > 0) {
//         tshirts[item.product_name].color.push(item.color);
//       }
//       if (!tshirts[item.product_name].size.includes(item.size) && item.availableQty > 0) {
//         tshirts[item.product_name].size.push(item.size);
//       }
//     }
//     else {
//       tshirts[item.product_name] = JSON.parse(JSON.stringify(item))
//       if (item.availableQty > 0) {
//         {/* we are checking tshirts[item.product_name] isme andar product hai uska availabeleqty > 0 hai ky for evrry color and size sabke lie check krega jake */ }
//         tshirts[item.product_name].color = [item.color]
//         tshirts[item.product_name].size = [item.size]
//       }
//     }
//   }
//   return {
//     props: { Products: JSON.parse(JSON.stringify(tshirts)) } // will be passed to the page component as props
//   }
// }

export async function getServerSideProps(context) {
  connectToMongo(); //checking database connnection
  let Products = await Product.find({ category: "Tshirts" })
  return {
    props: { Products: JSON.parse(JSON.stringify(Products)) }, // will be passed to the page component as props
  }
}


// we will not populate our content on client side via JS using useEffect here so we will use SSR to populate it on server side//
export default Tshirts;
