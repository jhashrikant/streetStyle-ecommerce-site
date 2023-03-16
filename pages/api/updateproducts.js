import Product from "@/Models/Product"
import connectToMongo from '../../Middlewares/mongoose'


// connectToMongo();  //checking database connnection

// const updateProduct = async (req, res) => {
//     if (req.method === 'PUT') {
//         const { productId, updatedProductData } = req.body;

//         // Update the product in the database using the `updateProduct` function from the `lib/db` module
//         const updatedProduct = await updateProduct(productId, updatedProductData);

//         // Send a response back to the client with the updated product data
//         res.status(200).json(updatedProduct);
//     } else {
//         // If the request method is not `PUT`, send a `405 Method Not Allowed` response
//         res.status(405).end();
//     }
// }


const updateProduct = async (req, res) => {
    if (req.method == 'PUT') {

        connectToMongo();  //checking database connnection
         
        try {
            for (let i = 0; i < req.body.length; i++) {
                const { slug, ...updatedData } = req.body[i];
                let productToUpdate = await Product.updateOne({ slug }, { $set: updatedData })
                if (!productToUpdate) {
                    return res.status(404).json({ error: "Product not found" });
                }
            }
            res.status(200).json({ Success: "product updated successfully" })

        } catch (error) {
            res.status(400).json({ error: "this method is not allowed" })
        }
    }
}


export default updateProduct;