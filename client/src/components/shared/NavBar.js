import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const auth = useContext(AuthContext);
  //   const {user} = useContext(AuthContext);
  //    if(user) => logout
  //    if(!user) => login/register

  const linkStyle = {
    margin: "5px",
    textDecoration: "none",
    color: "white",
  }

  const renderRightNav = () => {
    if (auth.user) {
      return <button onClick={auth.handleLogout}>Logout</button>;
    }
    return (
      <>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </>
    );
  };

  const renderLeft = () => {
    if (auth.user) {
      return (
        <>
          <Link className="Nav-link" to="/home">Home Protected</Link>
        </>
      );
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Comfortaa", padding: "10px", background: "#222529"}}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/Products" style={linkStyle}>Products</Link>
        <Link className="Nav-link" to="/categories" style={linkStyle}>Categories</Link>
        <Link to="/find_products" style={linkStyle}>Find Products</Link>

      </div>
      <div>{renderRightNav()}</div>
    </div>
  );
};
export default Navbar;
