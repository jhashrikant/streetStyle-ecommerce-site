import User from "@/Models/User"
import connectToMongo from '../../Middlewares/mongoose'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


connectToMongo()   //checking databqse connection

const Signup = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;   //getting credentials from req.body using object destructuring 
        console.log(req.body)
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Please enter credentails to create account" })
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        var hashedpassword = CryptoJS.AES.encrypt(password, 'secret123').toString();

        const user = await User.create({
            name: name,
            email: email,
            password: hashedpassword,
        })
        await user.save()
        res.status(200).json({ success: "user created" });
    }
    else {
        res.status(400).json({ Sorry: "some error occured" });
    }
};


export default Signup;