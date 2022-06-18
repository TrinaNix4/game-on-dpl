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
                <option value="DEFAULT" disabled hidden>Select a Seller...</option>
                {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>{seller.name}</option>
))}
            </Form.Select>
        )
    };

    const renderBuyerSelect = () => {
        return(
            <Form.Select defaultValue={'DEFAULT'} label='Select' onChange={getProducts} aria-label="Select Buyer">
            <option value="DEFAULT" disabled hidden>Select a Buyer...</option>
            {buyers.map((buyer) =>(
                <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
            ))}
            </Form.Select>
        );
    };

    const renderProducts = () => {
        if(!products){
            return <p>To view purchase history, please choose a seller and buyer</p>
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
        <div className='page'>
            <h1>Purchase History</h1>

            <h4>Seller:</h4>
            {/* do I have sellers? if yes, render the method */}
                <p>
                {sellers && renderSellerSelect()}
                </p>
                {/* {JSON.stringify(sellers)} */}
            <h4>Buyer:</h4>
                <p>
                {buyers && renderBuyerSelect()} 
                </p>
                 {/* {JSON.stringify(buyers)} */}
            <h4>Purchased Games:</h4>
            <p>
            {renderProducts()}
            </p>
              {/* {JSON.stringify(products)}  */}
        </div>
    );
    };

export default FindProducts