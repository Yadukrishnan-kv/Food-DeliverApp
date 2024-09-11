import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AllOrders.css'
function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/Allorders");
        console.log(res);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        // Optionally display an error message to the user
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div style={{ display: "flex" }}>
     
    
      <div className='list add1 flex-col' style={{ marginLeft: "10px" }}>
        <p>All Order Lists</p>
        <div className="list-table1">
          <div className="list-table-format title1">
           
            <b>Product Name</b>
            <b>Quantity</b>
            <b>Total Price</b>
            <b>Address</b>
            <b>Status</b>
          </div>
          {
            orders.map((order, index) => (
              <div key={index} className='list-table-format1'>
               
                <p>
                  {order.products.map(product => (
                    <div key={product.productId}>
                      {product.name}
                    </div>
                  ))}
                </p>
                <p>
                  {order.products.map(product => (
                    <div key={product.productId}>
                      {product.quantity}
                    </div>
                  ))}
                </p>
                <p>${order.totalAmount}</p>
                <p>
                  {order.address ? (
                    <>
                      {order.address.name}, {order.address.street}, {order.address.city}<br />
                      {order.address.phoneNumber}, {order.address.pincode}
                    </>
                  ) : (
                    <p>Shipping address not available.</p>
                  )}
                </p>
                <p>{order.status}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
