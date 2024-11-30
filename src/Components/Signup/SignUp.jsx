import { useFormik } from "formik";
import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/Theme";
import { SignupSchema } from "../../schemas/Signup";
import axios from "../../api/axios"
import { useMutation } from "@tanstack/react-query";
import { ROUTE_LOGIN } from "../../constants";
import { toast } from "react-toastify";

const SignUp = () => {

  const newUser = async (userData) =>{
    try{
      const response = await axios.post("users/signup" , userData);
      return response.data;
    }
    catch(error){
      // console.log("Error while Signing up user" , error)
      toast.error("Error while Signing up user" , error)
    }
  }

  const {mutateAsync} = useMutation({
    mutationFn:newUser,
    onSuccess: async (response) =>{
      if(response?.message === "User Already Exists"){
        // console.log("User Already Exists")
        toast.error("User Already Exists")
      }
      else{
        // console.log("Signup Successfully" , response);
        toast.success("Signup Successfull")
        navigate(ROUTE_LOGIN);
      }
    },
    onError: async (error) =>{
      // console.log("unable to signup user" , error);
      toast.error("unable to signup user" , error)
    }
  })

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
   
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const {confirm_password , ...userData} = values
      // console.log("Formik Signup Values", userData);
      mutateAsync(userData)
    },
  });

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={` min-h-screen h-auto ${
        theme === "default" ? "bg-[#233a77]" : "bg-black"
      }`}
    >
        <div className="flex items-center justify-center h-screen">

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
      <h2 className="text-white text-center p-4 text-2xl">SignUp</h2>

        <input
          name="username"
          type="text"
          placeholder="Enter Your Username"
          className="w-[400px] p-5 my-2 border-0 outline-0 break-all rounded-lg"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && touched.username ? (
          <p className="form-error text-red-500 pb-1">{errors.username}</p>
        ) : null}

        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-[400px] p-5 my-2 border-0 outline-0 break-all rounded-lg"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? (
          <p className="form-error text-red-500 pb-1">{errors.email}</p>
        ) : null}

        <input
          name="password"
          type="text"
          placeholder="Enter Your Password"
          className="w-[400px] p-5 my-2 border-0 outline-0 break-all rounded-lg"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <p className="form-error text-red-500 pb-1">{errors.password}</p>
        ) : null}

        <input
          name="confirm_password"
          type="text"
          placeholder="Confirm Your Password"
          className="w-[400px] p-5 my-2 border-0 outline-0 break-all rounded-lg"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirm_password && touched.confirm_password ? (
          <p className="form-error text-red-500 pb-1">{errors.confirm_password}</p>
        ) : null}

        <div className="flex gap-2 ml-12 flex-col">
          <button
            className="bg-[#9395D3] text-white w-48 rounded-lg p-3"
            type="submit"
          >
            SignUp
          </button>         
          <Link to={ROUTE_LOGIN} className="text-white border-b-2 -ml-5">Already have an account? Login Here.</Link>
        </div>

      </form>
      </div>

    </div>
  );
};

export default SignUp;
