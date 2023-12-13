import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [nome, setNome] = useState(searchParams.get("nome"));
  const [marca, setMarca] = useState(searchParams.get("marca"));
  const [cor, setCor] = useState(searchParams.get("cor"));
  const [descricao, setDescricao] = useState(searchParams.get("descricao"));
  const [imageUrl, setImageUrl] = useState(searchParams.get("imageUrl"));

  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/carros/atualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          image_url: imageUrl,
          nome: nome,
          marca: marca,
          descricao: descricao,
          cor: cor,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o carro");
      }

      console.log(`Carro ${id} atualizado com sucesso!`);
      navigate("/cars");
    } catch (error) {
      console.error("Erro ao atualizar o carro:", error.message);
      // Adicione aqui tratamento de erro, se necessário
    }
  };

  return (
    <div>
      <h1>Editar carro</h1>
      <form onSubmit={handleUpdate}>
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
            placeholder="Imagem do carro"
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
        <button className="btn">Editar</button>
      </form>
    </div>
  );
};

export default UpdateCar;
