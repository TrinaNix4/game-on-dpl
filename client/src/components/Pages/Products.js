import axios from "axios";
import {useState, useEffect} from "react"
import { ListGroup, Table } from "react-bootstrap"


const Products = (props) => {

  const [products, setProducts] = useState([]);
  const [sellersProducts, setSellersProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const normalizeProducts = (rawProducts) => {
    let sellers = rawProducts.map((rp) => rp.seller_id);
    let uniqueIds = [...new Set(sellers)];
    let sellersProductsData = uniqueIds.map((uid) => {
      let products = rawProducts.filter((rp) => uid == rp.seller_id);
      let { seller_name, email } = products[0];
      return {
        name: seller_name,
        email: email,
        products: products
      }
    })
    return sellersProductsData;
  };

  const renderRows = (products) => {
    return products.map((p) => {
      return (
        <tr>
          <td>{p.name}</td>
          <td>{p.description}</td>
          <td>{p.price}</td>
        </tr>
      );
    });
  };
  const renderData = () => {
    return sellersProducts.map((seller) => {
      return (
        <ListGroup>
          <ListGroup.Item>
          <div>
            <h1>{seller.name}</h1>
            <p>{seller.email}</p>
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Game</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{renderRows(seller.products)}</tbody>
          </Table>
        </ListGroup.Item>
        </ListGroup>
        
      );
    });
  };

 
useEffect(() => {
  getProducts();
}, []);

  const getProducts = async () => {
    try {
      let res = await axios.get('/api/products');
      let normalizedSellersProducts = normalizeProducts(res.data);
      setProducts(res.data)
      setSellersProducts(normalizedSellersProducts);
      
      setLoading(false)
    } catch (error) {
      alert('Error at products');
      setLoading(false)
      
    }
  };

  if (loading) return <p>Loading</p>;

  return (  
   <div>
     <ListGroup>{renderData()}</ListGroup>
   <p>{JSON.stringify(products)}</p>
   
  </div>
  )
  
}

export default Products
