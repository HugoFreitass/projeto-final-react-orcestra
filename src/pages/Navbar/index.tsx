import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuth from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, signed, signout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  const handleHome = () => {
    navigate("/");
  };


  return (
    <nav className={styles.navbar}>
      <h1 onClick={handleHome} style={{ cursor: "pointer"}}>Filmes</h1>
      <ul>
        {signed ? (
          
            <p>Olá, {user?.nome}! 

            &nbsp; &nbsp; &nbsp; &nbsp; 

            <Link to="/favorites">Meus Favoritos</Link>

            &nbsp; &nbsp; &nbsp; &nbsp; 

            <Link to="/edit">Configurações</Link>

            &nbsp; &nbsp; &nbsp; &nbsp;

            <a onClick={handleLogout} style={{ cursor: "pointer" }}>
              Sair
            </a>
            </p>
        ) : (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
