import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

const RegisterAnuncio = () => {
  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");

  const { id } = useParams();
  const { getUser } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = JSON.parse(getUser());

    // Constrói o objeto com os dados do anúncio
    const anuncioData = {
      titulo: title,
      descricao: descricao,
      user_email: userEmail.email,
      valor: parseFloat(valor),
      endereco: {
        logradouro: logradouro,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        uf: uf,
        numero: numero,
        complemento: complemento,
      },
      car_id: parseInt(id),
    };

    try {
      const response = await fetch("http://localhost:8080/anuncios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anuncioData),
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar o anúncio");
      }

      console.log("Anúncio cadastrado com sucesso!");
      // Limpa os campos do formulário após o cadastro bem-sucedido
      setTitle("");
      setDescricao("");
      setValor("");
      setLogradouro("");
      setBairro("");
      setCep("");
      setComplemento("");
      setNumero("");
      setUf("");
      setCidade("");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar o anúncio:", error.message);
      // Adicione aqui tratamento de erro, se necessário
    }
  };

  return (
    <div className={styles.register}>
      <h1>Publicar anúncio</h1>
      <p>Crie o seu anúncio e venda para todo o Brasil!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input
            type="text"
            name="titulo"
            required
            placeholder="Título do anúncio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Descrição: </span>
          <input
            type="text"
            name="descricao"
            required
            placeholder="Descrição do anúncio"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <label>
          <span>Valor: </span>
          <input
            type="number"
            name="valor"
            required
            placeholder="Valor do carro"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
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
            min={9}
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
        <button className="btn">Publicar</button>
      </form>
    </div>
  );
};

export default RegisterAnuncio;
