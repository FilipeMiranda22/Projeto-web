import { useEffect, useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logout, user: userContext } = useAuthValue();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(userContext);
  }, [userContext]);

  const handleLogout = () => {
    setUser(false);
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        New <span>Car</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Meus Carros
            </NavLink>
          </li>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={handleLogout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
