import jwt from 'jsonwebtoken';  
import  dotenv from 'dotenv';

dotenv.config()
const authorization = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token) {
      return res.status(400).json({ message: "User not logged in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded"+decoded);
    req.user = decoded.id;
    console.log("req.user"+req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "token generated but User not logged in" });
  }
};

export default authorization;
