import { Link } from 'react-router-dom'
import styles from './Signup.module.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const navigate = useNavigate()
    const [error,setError]= useState(null)
    const [emailError,setEmailError]=useState(false)
    const nameInput= useRef()
    const emailInput =useRef()
    const passwordInput=useRef()
    const confirmPasswordInput = useRef()
    const mobileNoInput= useRef()
    const clearError = ()=>{
        setError(null)
    }
    const emailErrorClear=()=>{
        setEmailError(false)

    }

    const checkUnqiness=async ()=>{
        const opt={
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({email:emailInput.current.value.trim()})
        }
            const response = await fetch(`http://localhost:8000/user/email_uniquness`, opt);
            const responseData = await response.json();
            if(responseData.uniqueness=='false'){
                setEmailError(true)
            }
    }
    const handleSubmit=async (event)=>{
        event.preventDefault()
        if(passwordInput.current.value!==confirmPasswordInput.current.value){
            setError("Passwords does't match")
        }
        if(passwordInput.current.value.trim().length<8){
            setError("Password must be 8 characters long.")
        }
        if(emailInput.current.value.trim().length ===0||nameInput.current.value.trim().length ===0|| mobileNoInput.current.value.trim().length===0){
            setError("All fields are mandatory.")
        }
        const emailCheckOpt={
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({email:emailInput.current.value.trim()})
        }
        const emailCheckRespone = await fetch(`http://localhost:8000/user/email_uniquness`, emailCheckOpt);
            const emailResponseData = await emailCheckRespone.json();
            if(emailResponseData.uniqueness=='false'){
                setEmailError(true)
                return
            }
            const opt={
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({name:nameInput.current.value,email:emailInput.current.value, password: passwordInput.current.value, mobile_no:mobileNoInput.current.value})
            }
            try {
                const response = await fetch(`http://localhost:8000/user/register`, opt);
                const responseData = await response.json();
    
                if (response.status===200) {
                    navigate('/login')
                    return
                } 
            } catch (error) {
                setError("Network error. Please try again later.");
            }
    }
    return(<>
    <div className={styles.header}>
        <h1>Register User</h1>
    </div>
    <main>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' ref={nameInput} onFocus={clearError}/>
            <input type="text" placeholder='Email' ref={emailInput} onFocus={emailErrorClear} onBlur={()=>checkUnqiness()}/>
            {emailError&&<p className={styles.error}>Email should be unqiue.</p>}
            <input type="text" placeholder='Contact No' ref={mobileNoInput} onFocus={clearError}/>
            <input type="password" placeholder='Password' ref={passwordInput} onFocus={clearError}/>
            <input type="password" placeholder='Confirm Password' ref={confirmPasswordInput} onFocus={clearError}/>
            {error&&<p className={styles.error}>{error}</p>}
            <button type="submit">Register</button>

        </form>
        <div className={styles.loginDiv}>
            <h2>Already user? <Link to="/login">Login</Link></h2>
        </div>
    </main>
    </>)
}

export default Signup