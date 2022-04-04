import React, { useState, useEffect } from 'react'
import useAxios from 'axios-hooks'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios'

const FindProduct = () => {
    
    const [sellers, setSellers] = useState(null);
    const [products, setProducts] = useState(null);
    const [buyers, setBuyers] = useState(null);

    useEffect(()=>{
    getSellers()
  },[])

  const getSellers = async() => {
      try {
          let res = await axios.get('/api/products/sellers')
          setSellers(res.data)
      }catch (err){
          alert('Error in getSellers')
      }
  }
   

    const getBuyers = async(e) => {
        let id = e.target.value
        try{
            let res = await axios.get('/api/products/:seller_id')
        setBuyers(res.data)
        }catch(err){
            alert('error')
        }
    
    }
    



    
    
    
    
    
    
    
    
    return (
        <h1>Find Product</h1>
    )
}

export default FindProduct