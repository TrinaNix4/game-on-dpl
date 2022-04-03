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
        <Link className="Nav-link" to="/login">login</Link>
        <Link className="Nav-link" to="/register">register</Link>
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link className="Nav-link" to="/">Home</Link>
        <Link className="Nav-link" to="/categories">Categories</Link>
        <Link className="Nav-link" to="/products">Products</Link>
        {renderLeft()}

      </div>
      <div>{renderRightNav()}</div>
    </div>
  );
};
export default Navbar;
