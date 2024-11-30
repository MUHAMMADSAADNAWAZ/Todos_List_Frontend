import * as yup from 'yup'

export const SignupSchema =  yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")] , "passwords must match").nullable(),
})