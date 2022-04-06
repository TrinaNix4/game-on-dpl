import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const auth = useContext(AuthContext);
  //   const {user} = useContext(AuthContext);
  //    if(user) => logout
  //    if(!user) => login/register

  const renderRightNav = () => {
    if (auth.user) {
      return <button onClick={auth.handleLogout}>Logout</button>;
    }
    return (
      <>
        <Link to="/login" className='nav_link'>Login</Link>
        <Link to="/register" className='nav_link'>Register</Link>
      </>
    );
  };

  const renderLeft = () => {
    if (auth.user) {
      return (
        <>
          <Link className='nav_link' to="/home">Home Protected</Link>
        </>
      );
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Comfortaa', paddingTop: '10px', paddingBottom: '10px', background: '#181818'}}>
      <div>
        <Link to="/" className='nav_link'>Home</Link>
        <Link to="/products" className='nav_link'>Products</Link>
        <Link to="/categories" className='nav_link'>Categories</Link>
        <Link to="/find_products" className='nav_link'>Find Products</Link>

      </div>
      <div>{renderRightNav()}</div>
    </div>
  );
};
export default Navbar;
