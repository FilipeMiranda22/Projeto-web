import React, { useEffect, useState } from "react";
import { useFetchCars } from "../hooks/useFetchCars";
import { useAuthValue } from "../context/AuthContext";
import CarCard from "../components/CarCard";
import styles from "./ListCars.module.css";
import { Link, useSearchParams } from "react-router-dom";

const ListCars = () => {
  const { getUser } = useAuthValue();
  const { carros: fetchedCars } = useFetchCars(JSON.parse(getUser()));
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(fetchedCars);
  }, [fetchedCars]);

  const handleDelete = async (carroId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/carros/excluir/${carroId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao excluir o carro");
      }

      console.log(`Carro ${carroId} excluído com sucesso!`);

      // Atualiza a lista de carros após a exclusão, removendo o carro excluído
      setCars(cars.filter((carro) => carro.id !== carroId));
    } catch (error) {
      console.error("Erro ao excluir o carro:", error.message);
      // Adicione aqui tratamento de erro, se necessário
    }
  };

  return (
    <>
      <div className={styles.cars_header}>
        <h1>Meus Carros:</h1>
        <Link to="/register/car" className="btn">
          Add Carro
        </Link>
      </div>

      {cars.length == 0 && (
        <>
          <h1>Nenhum Carro foi encontrado!</h1>
        </>
      )}
      <div className={styles.container_cars}>
        {cars &&
          cars.map((carro) => (
            <CarCard
              key={carro.id}
              nome={carro.nome}
              descricao={carro.descricao}
              marca={carro.marca}
              cor={carro.cor}
              id={carro.id}
              imageUrl={carro.imageUrl}
              onDelete={() => handleDelete(carro.id)}
            />
          ))}
      </div>
    </>
  );
};

export default ListCars;
