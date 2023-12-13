import { useState, useEffect } from "react";

const api = "http://localhost:8080/anuncios/listar";

export function useFetchAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnuncios() {
      try {
        const response = await fetch(api); // Substitua pela URL real da API
        if (!response.ok) {
          throw new Error("Erro ao buscar os anúncios");
        }
        const data = await response.json();
        setAnuncios(data.content);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchAnuncios();
  }, []);

  return { anuncios, isLoading, error };
}
