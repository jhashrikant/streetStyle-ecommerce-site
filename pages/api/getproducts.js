import Product from '@/Models/Product'
import connectToMongo from '../../Middlewares/mongoose'

connectToMongo(); //checking databse connnection

const getAllProducts = async (req, res) => {
    let Products = await Product.find()  //retrieves all the documents from the Product collection using the find() method   
    res.status(200).json({ Products })
}

export default getAllProducts;


