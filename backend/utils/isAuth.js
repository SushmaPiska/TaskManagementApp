import jwt from 'jsonwebtoken';  
import  dotenv from 'dotenv';

export const isAuth = (req) => {
  const token = req.headers.authorization;
  // console.log(token)
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user=decoded.id;
    return true;
  } catch (error) {
    return false;
  }
};

