import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import parcel from '../../Assets/admin_assets/parcel_icon.png';
import './myorder.css';

function Myorders() {
  const { userId } = useContext(Context);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/getOrdersByUser/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className='my-orders-container'>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order._id} className='order-card'>
            <div className="order-header">
              <img src={parcel} alt="Parcel Icon" className='order-icon' />
              <h2>Order #{order._id}</h2>
            </div>
            <div className='order-details'>
              <ul className='order-products'>
                {order.products && order.products.length > 0 ? (
                  order.products.map(product => (
                    <li key={product.productId || 'unknown'}>
                      {product.name} x {product.quantity}
                    </li>
                  ))
                ) : (
                  <li>No products found for this order.</li>
                )}
              </ul>
              <p className='total-price'><strong>Total Price:</strong> ${order.totalAmount}</p>
              {order.address ? (
                <div className='order-address'>
                  
                  {/* <p>{order.address.name}, {order.address.street}, {order.address.city}</p>
                  <p>{order.address.phoneNumber}, {order.address.pincode}</p> */}
                </div>
              ) : (
                <p>Shipping address not available.</p>
              )}
              <p className='order-status'><strong>Status:</strong> {order.status}</p>
              <button className='track-order-btn'>Track Order</button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
}

export default Myorders;
