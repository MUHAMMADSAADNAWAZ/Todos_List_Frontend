import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/Theme";
import { LoginSchema } from "../../schemas/Login";
import axios from "../../api/axios"
import { useMutation } from "@tanstack/react-query";
import { ROUTE_HOME, ROUTE_SIGNUP } from "../../constants";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const { setUserid , setName , theme } = useContext(ThemeContext);


  const LoginUser = async (LoginData) =>{
    try{
      const response = await axios.post("users/login" , LoginData);
      return response.data;
    }
    catch(error){
      // console.log("Unable to Login" , error)
      toast.error("Unable to Login" , error)
    }
  }

  const {mutateAsync} =  useMutation({
    mutationFn: LoginUser,
    onSuccess: async (response) =>{
      if(response?.message === "Invalid Email or Password"){
        // console.log("Inavlid Email or Password")
        toast.error("Inavlid Email or Password")
      }
      else{
        setUserid(response?.user?._id);
        setName(response?.user?.username);
        // console.log("Successfully Logged in" , response);
        toast.success("Successfully Logged in")
        navigate(ROUTE_HOME);
      }
    },
    onError: async (error) =>{
      // console.log("Unable to Login" , error)
      toast.error("Unable to Login" , error)
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
   
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // console.log("Formik Login Values", values);
      mutateAsync(values)
    },
  });


  return (
    <div
      className={` min-h-screen h-auto ${
        theme === "default" ? "bg-[#233a77]" : "bg-black"
      }`}
    >
        <div className=" flex items-center justify-center h-screen">

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
      <h2 className="text-white text-center p-4 text-2xl">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-[400px] p-5 my-5 border-0 outline-0 break-all rounded-lg"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? (
          <p className="form-error text-red-500 pb-2">{errors.email}</p>
        ) : null}

        <input
          name="password"
          type="text"
          placeholder="Enter Your Password"
          className="w-[400px] p-5 my-5 border-0 outline-0 break-all rounded-lg"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <p className="form-error text-red-500 pb-2">{errors.password}</p>
        ) : null}

        <div className="flex flex-col gap-4 ml-12">
          <button
            className="bg-[#9395D3] text-white w-48 rounded-lg p-3"
            type="submit"
          >
            Login
          </button>
          <Link to={ROUTE_SIGNUP} className="text-white border-b-2 -ml-5">Don`t have an account? Signup Here.</Link>
          
        </div>
      </form>
      </div>

    </div>
  );
};

export default Login;
