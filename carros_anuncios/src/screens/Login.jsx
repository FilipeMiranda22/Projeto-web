import { useState } from "react";
import styles from "./Login.module.css";
import { useAuthValue } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const successLogin = await login({ email, password });
    console.log("SUCESSO", successLogin);
    if (successLogin) {
      navigate("/");
      return;
    }
    alert("Dados de login incorretos, tente novamente");
    setPassword("");
  };

  return (
    <div className={`${styles.login}`}>
      <h1>Login</h1>
      <p>Faça o Login para utilizar o sistema!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
