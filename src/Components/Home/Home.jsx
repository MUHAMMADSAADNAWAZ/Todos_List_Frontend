import React, {  useContext, } from 'react'
import edit from '../../assets/edit.png'
import delete_icon from '../../assets/delete.png'
import add from '../../assets/add.png'
import { useNavigate } from 'react-router-dom'
import { ThemeContext} from '../ThemeContext/Theme'
import axios from '../../api/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ROUTE_ADD_TODO } from '../../constants'
import { toast } from 'react-toastify'

const Home = () => {

  const {userid , name , theme } = useContext(ThemeContext); 

    const queryClient = useQueryClient();

    const fetchTodos = async () =>{
        try{
            const response = await axios.get('todos/' , {
              params: {userid: userid}
            });
            return response.data
        }
        catch(error){
            // console.error("error fetching todos" , error);
            toast.error("error fetching todos" , error)
        }
    }

  const {data} = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const deleteTodo = async (id) =>{
    const response = await axios.delete(`todos/${id}/`)
    return response.data;
  }

  const {mutateAsync} = useMutation({
    mutationFn:deleteTodo,
    onSuccess: () =>{
        // console.log("Todo is Successfully Deleted");
        toast.success("Todo is Successfully Deleted")
        queryClient.invalidateQueries("todos");
    },
    onError: (error) =>{
        // console.error("unable to delete Todo" , error);
        toast.error("unable to delete Todo" , error);
    }
  })

    const navigate = useNavigate();

  return (
    <div className={`home min-h-[90svh] h-auto bg-[#233a77] ${theme === "default" ? "bg-[#233a77]" : "bg-black"}`}>
    
        <h2 className='text-white text-center p-5 text-4xl font-bold'>Welcome <span className='font-extrabold text-6xl uppercase'>{name}</span> to your Todo`s App</h2> 
    
        <div className={`box m-auto w-[700px] min-h-[420px] h-auto p-5 rounded-lg ${theme === "default" ? "bg-black" : "bg-blue-900"}`}>

            {data?.length === 0 || !data ? <h2 className='text-white font-semibold text-center text-lg'>No Todos Available</h2> : data?.map((todo)=>{
                return(<div key={todo._id} className="boxes bg-white w-full p-5 rounded-lg flex justify-between mb-4">
                <div className="left flex flex-col gap-2 w-[95%]">
                    <p className='text-sm font-semibold text-[#9395D3]'>{todo?.title}</p>
                    <p className='text-sm text-black'>{todo.description}</p>
                </div>
                <div className="right flex gap-5 py-3">
                    <img src={edit} alt="edit"  className='w-5 h-5 cursor-pointer' onClick={() => {navigate(`/edit/${todo.id}`)}}/>
                    <img src={delete_icon} alt="delete" className='w-5 h-5 cursor-pointer' onClick={() => {mutateAsync(todo.id)}} />
                </div>
            </div>)
            })}

        </div>
        <div className="add bg-[#9395D3] w-[100px] h-[100px] rounded-full relative left-[1020px] bottom-[100px]">
            <img src={add} alt="add" className='p-10 cursor-pointer' onClick={() => navigate(ROUTE_ADD_TODO)}/>
        </div>
    </div>
  )
}

export default Home
