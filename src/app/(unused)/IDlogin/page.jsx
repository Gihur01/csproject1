"use client"
import React from 'react'
import {useState} from 'react'
import styles from './page.module.css'

const Login = () => {
  const [idNum, changeIdNum] = useState("")
  function submit(){
    // submit idNum to firebase authentication...
    // alert("hi");
  }
  return (
    <div>
      <h3>
        Please log in
      </h3>
      <input className={styles.login-input-bar} onChange={e=>changeIdNum(e.target.value)}/>
      <button className='login-submit-button' onClick={e=>submit(e.target.value)}>login</button>
    </div>
  )
}

export default Login