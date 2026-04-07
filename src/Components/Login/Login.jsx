import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { authContext } from '../../Context/AuthContext'
import { Helmet } from 'react-helmet'


export default function Login() {
const [error , SetError] = useState(``)
const [isLOading , setIsLOading] = useState(false)
const Navigate  = useNavigate()
const {setIsLogin} = useContext(authContext)







let validationSchema = Yup.object({
  email : Yup.string().required('email is required').email('invalide email'),
  password : Yup.string().required('password is requierd'),


})



 const {errors, values, handleBlur , handleSubmit , handleChange , touched , isValid} = useFormik({
    initialValues : {
      email : `haysm155@gmail.com`,
      password : `Ahmed123`,

    },
    
    onSubmit : async () => {
      setIsLOading(true)
      try {
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values ) 
        console.log(data);
        
        if(data?.message == 'success') {
          setIsLOading(false)
          setIsLogin(true)
          localStorage.setItem(`userToken` , data.token)
          localStorage.setItem('UserRole' , data.user.role)
          localStorage.setItem('UserName' , data.user.name)
          localStorage.setItem('UserEmail' , data.user.email)
          Navigate('/home')
        }
  
      } 
      catch(error) {
        SetError(error.response.data.message );
        setIsLOading(false)
      }
    } ,
    
    validationSchema ,
  })



  return <>

  <Helmet>
      <meta charSet="utf-8" />
      <title>Fresh Cart | login</title>
    </Helmet>
      
      <div className="Login">
            <div className="container">
            <div className="Login-form ">
          <h2>Login Now :</h2>
            <p className='foget-p'>Let's get started for free</p>
          <form  onSubmit={handleSubmit}>

              <label htmlFor="email">email</label>
              <input className='form-control'  value={values.email} onChange={handleChange} onBlur={handleBlur} id='email' name='email' type="email" />
              {errors.email && touched.email && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.email}</p>} 

              <label htmlFor="password">password</label>
              <input className='form-control'  value={values.password} onChange={handleChange} onBlur={handleBlur} id='password' name='password' type="password" />
              { errors.password && touched.password && <p className='alert alert-danger'><i className="fa-solid fa-x text-danger "></i> {errors.password}</p>} 

                  <div className=" submit-btn   d-inline-block">
                  <button  disabled={!isValid || isLOading}   type='submit'>Submit</button>
                  </div>

                  <div className="error ms-5 d-inline-block w-75">
                    {error? <p className='alert alert-danger  text-center' > {error} </p> :`` }
                  </div>

                  <Link className='foget-link d-block' to={`/fogetpassword`}>Forget Password ?</Link>
                  <span className='foget-p'>Create a new account ? <Link className='foget-link' to={`/regestier`}> Regiser</Link></span>


            </form>
      </div>
            </div>
      </div>
  
  
  
  </>
}
