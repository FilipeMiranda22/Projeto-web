import { useState, useEffect } from "react";

const api = "http://localhost:8080/carros/listar";

export function useFetchCars({ email }) {
  const [carros, setCarros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch(`${api}?user_email=${email}`); // Substitua pela URL real da API
        if (!response.ok) {
          throw new Error("Erro ao buscar os carros");
        }
        const data = await response.json();
        setCarros(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return { carros, isLoading, error };
}
