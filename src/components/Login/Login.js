import styles from './Login.module.css'
import logo from '../../assets/images/Logo.png'
import { Link, redirect } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useLoginValue } from '../context/loginContext'
import { useNavigate } from 'react-router-dom'
function Login(){
    const [error,setError]= useState(null)
    const emailInput = useRef()
    const passwordInput = useRef()
    const navigate = useNavigate();
    const {login,setLogin} = useLoginValue()
    const clearError = ()=>{
        setError(null)
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        if (emailInput.current.value.trim().length===0 || passwordInput.current.value.trim().length===0){
            setError("Email and password can't be empty.")
            return
        }
        const opt={
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({email:emailInput.current.value, password: passwordInput.current.value})
        }
        try {
            const response = await fetch(`http://localhost:8000/user/login`, opt);
            const responseData = await response.json();

            if (response.status==422) {
                setError(await responseData.message);
                return;
            }
            localStorage.setItem('user',JSON.stringify({...responseData.data}))
            setLogin({...responseData.data}) 
            navigate('/')
        } catch (error) {
            setError("Network error. Please try again later.");
            console.error("Network error:", error);
        }
    }
    return (<>
    <div className={styles.container}>
            <header>
                <img src={logo} width="100px" height="100px"/>
            </header>
            <main>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" placeholder='Email' ref={emailInput} onFocus={clearError}/>
                    <input type="password" placeholder='Password' ref={passwordInput} onFocus={clearError}/>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <div className={styles.signUp}>
                    <h2>New User? <Link to="/signup">Register User</Link></h2>
                </div>
            </main>
            </div>
    </>)
}


export default Login;