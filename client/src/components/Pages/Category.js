import React, { useState } from 'react';
import useAxios from "axios-hooks";
import Products from './Products';
import { Form, Table } from 'react-bootstrap';


const Categories = (props) => {
const [{data: products, loading, error}] = useAxios("/api/products"); 

const[filteredCategories, setFilteredCategories] = useState(null);
if(error) return <p>Error occurred</p>;
if (loading) return <p>Loading...</p>;

const getUniqueCategories = () => {
  return products.reduce((accum, d) => {
    if (!accum.includes(d.category)) {
      accum.push(d.category);
    }
    return accum;
  
  }, []);
}; 

const handleSelect = (event) => {
  let selectedCategory = event.target.value; 
  setFilteredCategories(products.filter((p)=> p.category === selectedCategory))
};


const renderSelect = (categories) => {
    return (
      <Form.Select defaultValue={'DEFAULT'}
        label='Select'  
        onChange={handleSelect} 
        aria-label="Select Category">
        <option value="DEFAULT" 
        disabled hidden>Please Choose...</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </Form.Select>
    );
  };
const getSelect = () => {
  let uniqueCategories = getUniqueCategories();
  return renderSelect(uniqueCategories);
};

const renderFilteredCategoryProducts = () => {
  if (!filteredCategories) {
    return <p></p>;
  }


return (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {filteredCategories.map((c) =>(
        <tr>
          <td>{c.name}</td>
          <td>{c.price}</td>
          <td>{c.description}</td>
        </tr>
      ))}
    </tbody>
  </Table>
      );
   };
      return (
    <div>
      <h1>Categories</h1>
      {getSelect()}
      {renderFilteredCategoryProducts()}
    </div>
  );
};
      

export default Categories; 





