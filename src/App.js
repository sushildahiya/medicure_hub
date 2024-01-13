import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import styles from './App.module.css'
import Home from './components/Home/Home'
import Exercise from './components/Exercise/Exercise'
import Medicine from './components/Medicine/Medicine'
import MedicineHistory from './components/MedicineHistory/MedicineHistory'
import Water from './components/Water/Water'
import Report from './components/Report/Report'
import Login from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute'
import { LoginContextProvider, useLoginValue } from './components/context/loginContext'
function App() {
  const {login,setLogin}=useLoginValue()
  const routes = createRoutesFromElements(
  <>
  <Route path='/' element={<PrivateRoute Component={<Home/>}/>}/>
  <Route path="/medicine" element={<PrivateRoute Component={ <Medicine/>}/>}/>
  <Route path="/water" element={<PrivateRoute Component={ <Water/>}/>}/>
  <Route path="/exercise" element={<PrivateRoute Component={<Exercise/>}/>}/>
  <Route path="/report" element={<PrivateRoute Component={<Report/>}/>}/>
  <Route path="/medicine_history" element={<PrivateRoute Component={<MedicineHistory/>}/>}/> 
  <Route path="/login" element={login?<Home/>:<Login/>} />
  </>
  )
  const router = createBrowserRouter(routes)
  return (
    <div className={styles.appContainer}>
        
        <div className={styles.appContent}>
          <RouterProvider router={router}/>
        </div>
    </div>
  );
}

export default App;
