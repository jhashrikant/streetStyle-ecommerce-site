import User from "@/Models/User"
import connectToMongo from '../../Middlewares/mongoose'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

connectToMongo()   //checking database connection

const Login = async (req, res) => {
    if (req.method === 'POST') {

        const { email, password } = req.body;
        // Validate email and password
        
        try {
            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and password are required to login' });
            }

            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ success: false, error: "Please enter valid email to Login" });
            }

            var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');    //  decryped the pasword stored in databse and compared with the incoming password 
            var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            //Doing user authorization using cryptojs by checking thr name and password provided with the database 
            if (user) {
                if (email == user.email && password == decryptedPassword) {
                    const authToken = jwt.sign({ userId: user.id }, 'shrikant', { expiresIn: '2d' });
                    console.log(authToken);
                    res.status(200).json({ success: true, authToken })
                }
                else {
                    res.status(400).json({ success: false, Error: "Invalid credentials" })
                }
            }
        } catch (error) {
            res.status(500).json({ success: false, Sorry: "user not found" })
        }
    }
};


export default Login;