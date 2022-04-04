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
        <Link to="/login" style={linkStyle}>login</Link>
        <Link to="/register" style={linkStyle}>register</Link>
      </>
    );
  };

  const renderLeft = () => {
    if (auth.user) {
      return (
        <>
          <Link to="/home">Home Protected</Link>
        </>
      );
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Comfortaa", padding: "10px", background: "#222529"}}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/Products" style={linkStyle}>Products</Link>
        <Link to="/find" style={linkStyle}>Find Product</Link>
        {renderLeft()}

      </div>
      <div>{renderRightNav()}</div>
    </div>
  );
};
export default Navbar;
