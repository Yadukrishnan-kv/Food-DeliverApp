import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { assets } from '../../Assets/assets'
import  './SearchProduct.css'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
    const query = useQuery().get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {cartItem, addCart, removCart}=useContext(Context);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/searchproduct?q=${query}`);
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching results: {error.message}</p>;

  return (
    <div className='searchproduct'>
      <div className="food-disp-list" style={{color:"black",textDecoration:"none"}}>
        {results.map((result)=>
     
    <div className='food-item'>
     <div className="food-item-container" key={result._id}>
     <Link to={`/product/${result._id}`}> <img src={result.image} alt="" className='food-item-img' /></Link> 
     <button onClick={() => addCart(result._id)} className='carttt'>Add to Cart</button>
     </div>
     <div className="food-item-info">
        <div className="food-item-name-rating">
            <p style={{color:"black",textDecoration:"none"}}>{result.name}</p>

        </div>
        <p className='food-item-descrip'>{result.description}</p>
        <p className='food-item-price'>${result.price}</p>
  
     </div>
    
    </div>
   
    )}
  
    </div>

    </div>
  
  )
}

export default SearchProduct


