import React, { useContext, useEffect, useState } from 'react'
import '../../Pages/Login/Login.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../Context/Context'
function ProfileUpdate() {
    const {userId }=useContext(Context)
    const Navigate=useNavigate()
    const {id}=useParams()
    const [profileUpdate, setprofileUpdate] = useState({name: "",email: "",role: "",password: ""})
    const update=(e)=>{
        setprofileUpdate({...profileUpdate,[e.target.name]: e.target.value})  
    }
    useEffect(() => {
        axios.get("http://localhost:4000/proview/"+id).then((res)=>{
          console.log(res);
          setprofileUpdate(res.data)
        }).catch((err)=>{
          console.log(err);
        })
        
      }, [])
      const handleupdate=()=>{
        axios.put("http://localhost:4000/updateprofile/"+id,profileUpdate).then((res)=>{
            console.log(res);
            Navigate(`/profile/${userId}`)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className='login'>
    <form action="" className="login-container"  onChange={update} onSubmit={(e)=>{e.preventDefault(); 
        handleupdate();}}>
      <div className="login-title">
        <h2>Sign-up</h2>
      </div>
      <div className="login-input">
        <input type="text" placeholder='Name' required  name='name' defaultValue={profileUpdate.name} />
        <input type="email" placeholder='Email' required name='email' defaultValue={profileUpdate.email} />
        <select name="role" id="" defaultValue={profileUpdate.role} >
        <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        <input type="password" placeholder='Password' name='password' required defaultValue={profileUpdate.password}/>
       
      </div>
      <button>Update</button>
    </form>
</div>
  )
}

export default ProfileUpdate