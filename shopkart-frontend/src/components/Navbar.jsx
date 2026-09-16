import { useNavigate, Link } from "react-router-dom";
import { logoutCustomer } from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutCustomer();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home">ShopKart</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;