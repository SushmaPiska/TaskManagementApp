import { checkSchema } from 'express-validator';


const signupValidation = checkSchema({
  email: {
    isEmail: true,
    errorMessage: 'Please enter a valid email',
  },
  password: {
    isLength: {
      options: { min: 8 },
    },
    errorMessage: 'Password must be at least 8 characters long',
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        }
        return true;
      },
    },
  },
});

export default signupValidation;