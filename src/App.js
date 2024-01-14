import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import Home from './components/Home/Home';
import Exercise from './components/Exercise/Exercise';
import Medicine from './components/Medicine/Medicine';
import MedicineHistory from './components/MedicineHistory/MedicineHistory';
import Water from './components/Water/Water';
import Report from './components/Report/Report';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import { LoginContextProvider, useLoginValue } from './components/context/loginContext';
import Signup from './components/Signup/Signup';
import { useEffect, useState } from 'react';
import HealthData from './components/HealthData/HealthData';

function App() {
  const { login, setLogin } = useLoginValue();
  const [showHealthForm, setShowHealthForm] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (login) {
        const opt = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: login.user_id })
        };

        try {
          const response = await fetch(`http://localhost:8000/user/user_details`, opt);
          const responseData = await response.json();
          setShowHealthForm(await !responseData._doc.health_data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
   
    fetchData();
  }, [login]);

  const routes = createRoutesFromElements(
    <>
      <Route path='/' element={<PrivateRoute Component={<Home showHealthForm={showHealthForm}/>} />} />
      <Route path="/medicine" element={<PrivateRoute Component={<Medicine />} />} />
      <Route path="/water" element={<PrivateRoute Component={<Water />} />} />
      <Route path="/exercise" element={<PrivateRoute Component={<Exercise />} />} />
      <Route path="/report" element={<PrivateRoute Component={<Report />} />} />
      <Route path="/medicine_history" element={<PrivateRoute Component={<MedicineHistory />} />} />
      <Route path="/login" element={login ? <Home /> : <Login />} />
      <Route path="/signup" element={login ? <Home /> : <Signup />} />
      <Route path="/user_data" element={login ? <HealthData setShowHealthForm={setShowHealthForm} /> : <Login />} />
    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContent}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
