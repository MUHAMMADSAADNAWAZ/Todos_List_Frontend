import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Addtask from './Components/Add_Task/Addtask';
import Edittask from './Components/Edit_Task/Edittask';
import ErrorPage from './Components/Error/ErrorPage';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/SignUp';
import { ROUTE_ADD_TODO, ROUTE_EDIT_TODO, ROUTE_ERROR_PAGE, ROUTE_HOME, ROUTE_LOGIN, ROUTE_SIGNUP } from './constants';

function App() {

  const location = useLocation();

  return (
    <>
       {(location.pathname === ROUTE_HOME || location.pathname === ROUTE_ADD_TODO || location.pathname === ROUTE_EDIT_TODO) && <Header />}
      <Routes>
      <Route path={ROUTE_LOGIN} element={<Login />} />  
      <Route path={ROUTE_SIGNUP} element={<SignUp />} />  
      <Route path={ROUTE_HOME} element={<Home />} />
      <Route path={ROUTE_ADD_TODO} element={<Addtask />} />
      <Route path={ROUTE_EDIT_TODO} element={<Edittask />} />
      <Route path={ROUTE_ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </>
    
  );
}

export default App;
