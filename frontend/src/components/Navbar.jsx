import { Link } from "react-router-dom";
const Navbar = ( { setIsAuthenticated, isAuthenticated } ) => {
  const handleClick = () =>{
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };
  return (
    <nav>
      {isAuthenticated && (
      <div className="links">
            <h1>Welcome</h1>
            <button onClick={handleClick}>Logout</button>
          </div>  
      )}
      {!isAuthenticated &&(
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
