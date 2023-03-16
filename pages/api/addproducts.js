import Product from "@/Models/Product"
import connectToMongo from '../../Middlewares/mongoose'


connectToMongo();  //checking databse connnection

//adding products to database 
// const addProducts = async (req, res) => {
//     if (req.method === 'POST') {
//         const productsToAdd = req.body.map(product => ({
//             product_name: product.product_name,
//             slug: product.slug,
//             description: product.description,
//             price: product.price,
//             image: product.image,
//             size: product.size,
//             color: product.color,
//             category: product.category,
//             availableQty: product.availableQty

//         }));
//         try {
//             await Product.insertMany(productsToAdd);
//             res.status(200).json({ Success: 'Products added successfully' });
//         } catch (error) {
//             res.status(500).json({ Error: 'Failed to add products', details: error });
//         }
//     } else {
//         res.status(400).json({ Error: 'This method is not allowed' });
//     }
// };


const addProducts = async (req, res) => {
    if (req.method === 'POST') {
        const productsToAdd = req.body.map(product => ({
            product_name: product.product_name,
            default_img: product.default_img,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.category,
            colors: product.colors.map(color => ({
                color: color.color,
                image: color.image,
                sizes: color.sizes.map(size => ({
                    size: size.size,
                    quantity: size.quantity
                }))
            }))
        }));

        try {
            await Product.insertMany(productsToAdd);
            res.status(200).json({ Success: 'Products added successfully' });
        } catch (error) {
            res.status(500).json({ Error: 'Failed to add products', details: error });
        }
    } else {
        res.status(400).json({ Error: 'This method is not allowed' });
    }
};


export default addProducts;