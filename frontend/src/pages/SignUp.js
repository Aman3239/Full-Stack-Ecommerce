import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
    email:"",
    password:"",
    name:"",
    confirmPassword:"",
    profilePic:"",
  })

  const navigate=useNavigate()

  const handleOnChange = (e) => {
    const {name,value}= e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    console.log("imagePic", imagePic)
    setData((preve)=>{
      return{
        ...preve,
        profilePic:imagePic
      }
    })
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPassword){

      // console.log("SummaryApi.signUP.url",SummaryApi.signUP.url)

    const dataResponse=await fetch(SummaryApi.signUP.url,{
      method:SummaryApi.signUP.method,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const dataApi=await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/login")
    }
    if(dataApi.error)
    {
      toast.error(dataApi.message)
    }
  }
  else{
    toast.error("Please check your password and confirm password")
  }
}
  // console.log("data login", data)
  return (
    <section id="signup" className=''>
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto py-5 rounded">
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon" />
            </div>
            <form action="">
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 pt-2 cursor-pointer text-center absolute bottom-0 w-full '>
                  Upload photo
                </div>
                <input type="file" className='hidden' onChange={handleUploadPic} />
              </label>

            </form>
          </div>
          <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-200 p-2'>
                <input
                  type="text"
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-200 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className='bg-slate-200 p-2 flex items-center'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showPassword ? (<FaEyeSlash />) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className='bg-slate-200 p-2 flex items-center'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                  <span>
                    {
                      showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Sign Up</button>
          </form>

          <p className='my-5 '>Already have account ? <Link to={"/login"} className="text-red-600 hover:underline hover:text-red-700">Login</Link></p>
        </div>
      </div>

    </section>
  )
}

export default SignUp
