import React, { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [cor, setCor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const { getUser } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(getUser());
    console.log(user);
    const carData = {
      nome,
      image_url: imageUrl,
      marca,
      cor,
      descricao,
      user_email: user.email,
    };

    console.log(carData);

    try {
      const response = await fetch("http://localhost:8080/carros/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        // Aqui você pode tratar o sucesso do cadastro
        console.log("Carro cadastrado com sucesso!");
        navigate("/cars");
      } else {
        // Aqui você pode tratar possíveis erros no cadastro
        console.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };
  return (
    <div>
      <h1>Adicionar Carro</h1>
      <p>Adicione um carro para poder anunciá-lo</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="name"
            required
            placeholder="Nome do Carro"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          <span>Imagem (URL): </span>
          <input
            type="url"
            name="imageUrl"
            required
            placeholder="Url da imagem do carro"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          <span>Marca: </span>
          <input
            type="text"
            name="marca"
            required
            placeholder="Marca do Carro"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </label>
        <label>
          <span>Cor: </span>
          <input
            type="text"
            name="cor"
            required
            placeholder="Cor do carro"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          />
        </label>
        <label>
          <span>Descrição: </span>
          <input
            type="text"
            name="descricao"
            required
            placeholder="Descrição do carro"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <button className="btn">Adicionar</button>
      </form>
    </div>
  );
};

export default Cars;
