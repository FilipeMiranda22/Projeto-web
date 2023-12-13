import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const userData = {
      nome: name,
      email,
      telefone,
      password,
      endereco: { logradouro, bairro, cep, complemento, numero, uf, cidade },
    };

    console.log(userData);

    try {
      const response = await fetch("http://localhost:8080/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Aqui você pode tratar o sucesso do cadastro
        console.log("Usuário cadastrado com sucesso!");
        navigate("/login");
      } else {
        // Aqui você pode tratar possíveis erros no cadastro
        console.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  return (
    <div className={styles.register}>
      <h1>Cadastro</h1>
      <p>Crie seu usuário para poder anunciar o seu carro!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="name"
            required
            placeholder="Nome do Usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
          <span>Telefone: </span>
          <input
            type="tel"
            name="telefone"
            required
            placeholder="Telefone do Usuário"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        <label>
          <span>Logradouro: </span>
          <input
            type="text"
            name="logradouro"
            required
            placeholder="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
        </label>
        <label>
          <span>Bairro: </span>
          <input
            type="text"
            name="bairro"
            required
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </label>
        <label>
          <span>Cep: </span>
          <input
            type="text"
            name="cep"
            required
            placeholder="Cep"
            value={cep}
            max={9}
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        <label>
          <span>Complemento: </span>
          <input
            type="text"
            name="complemento"
            required
            placeholder="Complemento"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </label>
        <label>
          <span>Número: </span>
          <input
            type="text"
            name="numero"
            required
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </label>
        <label>
          <span>Estado (UF): </span>
          <input
            type="text"
            name="uf"
            required
            placeholder="Estado"
            value={uf}
            maxLength={2}
            onChange={(e) => setUf(e.target.value)}
          />
        </label>
        <label>
          <span>Cidade: </span>
          <input
            type="text"
            name="cidade"
            required
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
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
        <label>
          <span>Confirmar Senha: </span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Insira sua Senha Novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
