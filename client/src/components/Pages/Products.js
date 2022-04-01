import React from "react";
import axios from "axios";
import {useState, useEffect} from "react"
import { ListGroup, Table } from "react-bootstrap"


const Products = (props) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

 
useEffect(() => {
  getProducts();
}, []);

  const getProducts = async () => {
    try {
      let res = await axios.get('/api/products');
      setProducts(res.data)
      
      setLoading(false)
    } catch (error) {
      alert('Error at products');
      setLoading(false)
      
    }
  };

  if (loading) return <p>Loading</p>;

  return (  
   <div>
   <p>{JSON.stringify(products)}</p>
   
  </div>
  )
  
}

export default Products
