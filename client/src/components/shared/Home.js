import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {

  return (
    <div className='page'>
      <h1>Home</h1>
      <hr></hr>
      <p>Welcome to the absolute best place to find the RIGHT games at the RIGHT price! You won't be disappointed with our selection! Get ready for your next adventure and GAME ON!</p>
      <hr></hr>
      <p style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to='/products' className='home_link'>Search Games by Seller</Link> | <Link to='/categories' className='home_link'>Search Games by Category</Link> | <Link to='find_products' className='home_link'>Find Previously Sold Games</Link>
      </p>
    </div>
  );
};
export default Home;
