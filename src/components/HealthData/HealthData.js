import { useRef } from 'react'
import styles from './HealthData.module.css'
import { useLoginValue } from '../context/loginContext'
import { useNavigate } from 'react-router-dom'

function HealthData({setShowHealthForm}){
    const navigate = useNavigate()
    const {login,setLogin} = useLoginValue()
    const ageInput = useRef()
    const bloodInput =useRef()
    const heightInput= useRef()
    const weightInput= useRef()
    const addressInput = useRef()
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const opt={
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify(
                {
                    user_id:login.user_id,
                    blood_groud:bloodInput.current.value,
                    age:ageInput.current.value,
                    height:heightInput.current.value,
                    weight:weightInput.current.value,
                    address:addressInput.current.value    
                })
        }
        const response = await fetch(`http://localhost:8000/user/health_data`,opt)
        const responseData =  await response.json()
        setShowHealthForm(false)
        navigate('/')
    }
    return(<>
            <div className={styles.healthDataContainer}>
            <div className={styles.headerContent}>
                <h1>Health Data</h1>
            </div>
            <div >
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" placeholder='Age' ref={ageInput} required/>
                    <input type="text" placeholder='Blood Group' ref={bloodInput} required/>
                    <input type="text" placeholder='Height in cms' ref={heightInput} required/>
                    <input type="text" placeholder='Weight in kg' ref={weightInput} required/>
                    <textarea placeholder='Address' ref={addressInput} rows="4" cols="41">
                    </textarea>         
                    <button type="submit">SUBMIT</button>           
                </form>
                </div>
            </div>

    </>)
}

export default HealthData