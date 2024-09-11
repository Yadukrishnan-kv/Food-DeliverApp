import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ViewAllproducts.css'
import { NavLink } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
function ViewAllproducts() {
  const [view, setview] = useState([])
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get("http://localhost:4000/view").then((res)=>{
      console.log(res);
      setview(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
  }, [])

  const remove=(id)=>{
    axios.delete(`http://localhost:4000/remove/${id}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then((res)=>{
      console.log(res);
      const delet= view.filter(item=>item._id!==id)
      setview(delet)
    }).catch((err)=>{
      console.log(err);
    })
}

  return (
    <div style={{display:"flex"}}>
    
    
    <div className='list add1 flex-col' style={{marginLeft:"10px"}}>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          view.map((disp,index)=>{
            return(
              <div key={index} className='list-table-format'>
               <img src={disp.image} alt=""  />
                <p style={{color:"white"}}>{disp.name}</p>
                <p style={{color:"white"}}>{disp.category}</p>
                <p style={{color:"white"}}>${disp.price}</p>
                <MdDelete style={{fontSize:"20px",cursor:"pointer",color:"white"}} onClick={()=>remove(disp._id)}/>
             
                
              </div>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}

export default ViewAllproducts