import { NavLink,useNavigate } from "react-router-dom"
import styles from './Home.module.css'
import medicineIcon from '../../assets/images/medicine.png'
import waterIcon from '../../assets/images/glass.png'
import exerciseIcon from '../../assets/images/Exercise.png'
import userIcon from '../../assets/images/user.png'
import historyIcon from '../../assets/images/history.png'
import shopIcon from '../../assets/images/shop.png'
import reportIcon from  '../../assets/images/report.png'
import { useEffect, useState } from "react"
import { useLoginValue } from "../context/loginContext"

function Home({showHealthForm}){
    const navigate = useNavigate()
    const {login,setLogin} = useLoginValue()
    const handleLogout =(event)=>{
        event.preventDefault()
        localStorage.clear('user')
        setLogin(null)
    }
    useEffect(()=>{
        if(showHealthForm){
            navigate('/user_data')
          }
    },[])
    return(
        <>
        <div className={styles.profileContent}>
            <button type="submit" onClick={handleLogout}>Logout</button>
                <img src={userIcon} alt="user-img" width="50px" height="50px" />
        </div>
        <div className={styles.homeContainer}>
            
        
            <NavLink to ="/medicine" className={styles.medicineTab}>
            <div className={styles.medicineTabContent}>
                <div className={styles.medicineTabContent1}>
                    <img src={medicineIcon} alt="medicine-img" width="50px" height="50px"/>
                    <h2>Med Reminder</h2>
                </div>
                
                <div className={styles.medicineTabContent2}>
                    <h3>-----------------------</h3>
                    <h3>Take your pills</h3>
                </div>

            </div>
            </NavLink>
            <NavLink to ="/exercise" className={styles.exerciseTab}>
            <div className={styles.exerciseTabContent}>
                <div className={styles.exerciseTabContent1}>
                    <img src={exerciseIcon} alt="exercise-img" width="50px" height="50px"/>
                    <h2>Exercise</h2>
                </div>
                
                <div className={styles.exerciseTabContent2}>
                    <h3>-----------------------</h3>
                    <h3>Start Now</h3>
                </div>
            </div>
            </NavLink>
       
            <NavLink to ="/water" className={styles.waterTab}>
            <div className={styles.waterTabContent}>
                <div className={styles.waterTabContent1}>
                    
                    <h2>Water Tracker</h2>
                    <img src={waterIcon} alt="water-img" width="50px" height="50px"/>
                </div>
                
                <div className={styles.waterTabContent2}>
                    <h1>Track</h1>
                    <h3>your daily</h3>
                    <h3>water intake.</h3>
                </div>
            </div>
            </NavLink>

            <NavLink to ="/medicine_history" className={styles.medicineHistoryTab}>
            <div className={styles.medicineHistoryTabContent}>
                <div className={styles.medicineHistoryTabContent1}>
                    
                    <h2>Medicine History</h2>
                    <img src={historyIcon} alt="water-img" width="50px" height="50px"/>
                </div>
                
                <div className={styles.medicineHistoryTabContent2}>
                    <h1>Record</h1>
                </div>
            </div>
            </NavLink>
        
            <NavLink to ="/report" className={styles.reportTab}>
            <div className={styles.reportTabContent}>
                <div className={styles.reportTabContent1}>
                    <h2>Report</h2>
                    <img src={reportIcon} alt="water-img" width="50px" height="50px"/>
                </div>
                <div className={styles.reportTabContent2}>
                    <h3>Weekly Medicine </h3>
                        <h3>Report</h3>
                </div>
            </div>
            </NavLink>
       
       
            <div className={styles.pharmacyTab}>
                
            <div className={styles.pharmacyTabContent}>
                <div className={styles.pharmacyTabContent1}>    
                    <h2>Pharmacy Store</h2>
                    <img src={shopIcon} alt="water-img" width="50px" height="50px"/>
                </div>
                
                <div className={styles.pharmacyTabContent2}>
                    <h1>Coming Soon</h1>
                </div>
            </div>
            </div>
        </div>
        </>
        )
}

export default Home