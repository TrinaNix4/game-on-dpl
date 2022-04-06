import React, { useState, useEffect } from 'react'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios'

//Needed API calls
//get 'api/sellers' (onMount) => sellers
//get 'api/sellers/:id (onAgent Select) => buyers for a given seller
//get 'api/buyers/:id (onBuyer Select) => products for a given buyer 
  
const FindProducts = () => {
    
    const [sellers, setSellers] = useState(null);
    const [products, setProducts] = useState(null);
    const [buyers, setBuyers] = useState(null);

    useEffect(()=>{
    getSellers() //run on mount so do a getSellers()
   //getBuyers()
   //getProducts()
  },[])

  const getSellers = async() => {
      try {
          let res = await axios.get('/api/sellers')
          //go to return at bottom to do a quick check 
          setSellers(res.data)
      }catch (err){
          alert('Error in getSellers')
      }
  }

    const getBuyers = async(e) => {
        let id = e.target.value
        console.log("seller id: ", id)
        try{
            let res = await axios.get(`/api/sellers/${id}`)
        setBuyers(res.data)
        }catch(err){
            alert('error')
        }
    }
    
    const getProducts = async(e) => {
        let id = e.target.value
        console.log("buyer id: ", id)
        try{
            let res = await axios.get(`/api/buyers/${id}`)
       setProducts(res.data)
       console.log(res.data)
        }catch(err){
            alert('err in getProducts')
        }
    }

    const renderSellerSelect = () => {
        return (
            <Form.Select defaultValue={'DEFAULT'} label='Select' onChange={getBuyers} aria-label="Select Seller">
                <option value="DEFAULT" disabled hidden>Please choose a Seller...</option>
                {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>{seller.name}</option>
))}
            </Form.Select>
        )
    };

    const renderBuyerSelect = () => {
        return(
            <Form.Select defaultValue={'DEFAULT'} label='Select' onChange={getProducts} aria-label="Select Buyer">
            <option value="DEFAULT" disabled hidden>Please Choose a Buyer...</option>
            {buyers.map((buyer) =>(
                <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
            ))}
            </Form.Select>
        );
    };

    const renderProducts = () => {
        if(!products){
            return <p>Please select a seller first</p>
        }
        if(products.length === 0) {
            return <p>no products available </p>
        console.log(products)
        }
        return products.map((p)=>{
            return(
                <div key={p.id} style={{border:'1px solid', margin:'10px'}}>
                    <p>Game Title: {p.name}</p>
                    <p>Price: {p.price}</p>
                    <p>Description: {p.description}</p>
                    <p>Console: {p.category}</p>
                    
                </div>
            )
        })
    }

    return(
        <div>
            <h1>Find Products by Seller</h1>
            <p>Sellers:</p>
            {/* do I have sellers? if yes, render the method */}
                {sellers && renderSellerSelect()}
                {/* {JSON.stringify(sellers)} */}
            <p>Buyers:</p>
                {buyers && renderBuyerSelect()} 
                 {/* {JSON.stringify(buyers)} */}
            {/* <p>Products:</p>
            {renderProducts()}
              {JSON.stringify(products)}  */}
        </div>
    );
    };

export default FindProducts