import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { todoSchema } from '../../schemas';
import { ThemeContext } from '../ThemeContext/Theme';
import axios from "../../api/axios"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ROUTE_HOME } from '../../constants';
import { toast } from 'react-toastify';

const Edittask = () => {

  const {todoId} = useParams()

  const queryClient = useQueryClient();

  const fetchTodo = async () =>{
    try{
      const response = await axios.get(`todos/${todoId}/`);
      return response.data;
      
    }
    catch(error){
      // console.error("unable to get todo data" , error)
      toast.error("unable to get todo data" , error)
    }
  }

  const {data} = useQuery({
    queryKey: ['singletodo'],
    queryFn: fetchTodo,
  })

  const updateTodo = async (updatedToto) => {
    try{
      const response = await axios.put(`todos/${todoId}/` , updatedToto)
      return response.data
    }
    catch(error){
      // console.error("error while updating todo" , error)
      toast.error("error while updating todo" , error)
    }
  }

  const {mutateAsync} = useMutation({
    mutationFn:updateTodo,
    onSuccess: () =>{
      // console.log("todo data updated successfully");
      toast.success("todo data updated successfully")
      queryClient.invalidateQueries("todos");
      navigate(ROUTE_HOME);

    },
    onError: (error) =>{
      // console.error("Unable to update todo data" , error);
      toast.error("Unable to update todo data" , error)
    }
  })

  const titleRef = useRef(null);
  const navigate = useNavigate();

  const {values , errors , touched , handleBlur , handleChange , handleSubmit , resetForm } = useFormik({
    initialValues: {
      title: data ? data?.title : '', 
      description: data ? data?.description : '', 
    },
    validationSchema : todoSchema,
    onSubmit : (values) => {

     mutateAsync(values)
      resetForm();
      // console.log("Formik Edit Values" , values);   
     
    },
    enableReinitialize: true
  })


  useEffect(()=>{
    titleRef.current.focus();
  } , []);  

  const {theme} = useContext(ThemeContext);

  return (
    <div className={` min-h-screen h-auto ${theme === "default" ? "bg-[#233a77]" : "bg-black"}`}>
    <h2 className='text-white text-center p-4 text-2xl'>Edit Todo Task</h2>
        <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <input ref={titleRef} name='title' type="text" placeholder='Enter todo title' className='w-[400px] p-5 my-5 border-0 outline-0 break-all' value={values.title} onChange={handleChange} onBlur={handleBlur}/>
            {(errors.title && touched.title) ? <p className='form-error text-red-500 pb-2'>{errors.title}</p> : null}
            <textarea name='description' placeholder='Enter todo Details' rows='8' cols='47' className='p-5 mb-5 border-0 outline-0 break-all' value={values.description} onChange={handleChange} onBlur={handleBlur}></textarea>
            {(errors.description && touched.description) ? <p className='form-enter text-red-500 pb-2'>{errors.description}</p> : null}
            <div className='flex gap-5'>
            <button className='bg-[#9395D3] text-white w-48 rounded-lg p-3' type='submit'>Update</button>
            <button className='bg-[#9395d3] text-white w-48 rounded-lg p-3' onClick={() => navigate(ROUTE_HOME)}>Cancel</button>
            </div>
        </form>
    </div>

  )
}

export default Edittask