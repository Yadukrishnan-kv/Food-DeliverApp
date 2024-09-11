import React, { useEffect, useState } from 'react'
import axios, {} from "axios"
import './List.css'

import edit from '../icons8-edit-25 (1).png'
import { Link } from 'react-router-dom'
function List() {
  const [view, setview] = useState([])
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get("http://localhost:4000/view",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    ).then((res)=>{
      console.log(res);
      setview(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    
  }, [])
  // const remove=(id)=>{
  //     axios.delete(`http://localhost:4000/remove/${id}`,{
  //       headers: {
  //           'Authorization': `Bearer ${token}`
  //       }
  //   }).then((res)=>{
  //       console.log(res);
  //       const delet= view.filter(item=>item._id!==id)
  //       setview(delet)
  //     }).catch((err)=>{
  //       console.log(err);
  //     })
  // }
  return (
    <div className='food-disp'>
      <h2>Explore Top dishes near you</h2>
    <div className="food-disp-list">
    
       {view.map((disp)=>
      <>
      
    <div className='food-item'>
     
     <div className="food-item-container">
     <Link to={`/product/${disp._id}`}>   <img src={disp.image} alt="" className='food-item-img' /></Link>
      </div>
     <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{disp.name}</p>
            
      </div>
        <p className='food-item-descrip'>{disp.description}</p>
        <p className='food-item-price'>${disp.price}</p>
            
     </div>
    {/* <div className="dlt-edit-logo">
     <Link to={`/update/${disp._id}`}><img src={edit} alt=""  style={{width:"25px"}}/></Link>
    <img src={dlt} alt="" style={{width:"25px"}} onClick={()=>remove(disp._id)} />
    </div> */}
    </div>
     </>
    )}
    </div>
 </div>
  )
}

export default List