import React, {useContext, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { todoSchema } from '../../schemas';
import { useFormik } from 'formik';
import { ThemeContext } from '../ThemeContext/Theme';
import axios from "../../api/axios"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTE_HOME } from '../../constants';
import { toast } from 'react-toastify';

const Addtask = () => {

  const {userid , theme} = useContext(ThemeContext);

  const titleRef = useRef(null);
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const initialValues = {
    name : '',
    description : ''
  }

  const addTodo = async (newTodo) =>{
    const response = await axios.post("todos" , newTodo);
    return response.data;
  }

  const {mutateAsync} = useMutation({
    mutationFn:addTodo,
    onSuccess: () =>{
      // console.log("Todo added Successfully");
      toast.success("Todo added Sucessfully");
      queryClient.invalidateQueries("todos")
      navigate(ROUTE_HOME);
    },
    onError: (error) =>{
      // console.error("Unable to add todo" , error)
      toast.error("Unable to add todo" , error)
    }
  })
  
  const {values , errors , touched , handleBlur , handleChange , handleSubmit , resetForm} = useFormik({
    initialValues : initialValues,
    validationSchema : todoSchema,
    onSubmit : (values) => {
      const newValues = {userid , ...values}
      mutateAsync(newValues);
      resetForm();
      // console.log("Formik Values" , newValues);  
    }
  })

  useEffect(()=>{
    titleRef.current.focus();
  } , []);

  return (
    <div className={` min-h-[90svh] h-auto ${theme === "default" ? "bg-[#233a77]" : "bg-black"}`}>
    <h2 className='text-white text-center p-4 text-2xl'>Add Todo Task</h2>
        <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <input name='name' ref={titleRef} type="text" placeholder='Enter todo title' className='w-[400px] p-5 my-5 border-0 outline-0 break-all' value={values.name} onChange={handleChange} onBlur={handleBlur}/>
            {(errors.name && touched.name) ? <p className='form-error text-red-500 pb-2'>{errors.name}</p> : null}
            <textarea name='description' placeholder='Enter todo Details' rows='8' cols='47' className='p-5 mb-5 border-0 outline-0 break-all' value={values.description} onChange={handleChange} onBlur={handleBlur}></textarea>
            {(errors.description && touched.description) ? <p className='form-enter text-red-500 pb-2'>{errors.description}</p> : null}
            <button className='bg-[#9395D3] text-white w-96 rounded-lg p-3' type='submit'>ADD</button>
        </form>
    </div>

  )
}

export default Addtask