import { useState, useEffect } from "react";

const api = "http://localhost:8080/anuncios/listar";

export function useFetchAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnuncios() {
      try {
        let allAnuncios = [];
        let pageNumber = 0;
        let totalPages = 1;

        while (pageNumber < totalPages) {
          const response = await fetch(`${api}?page=${pageNumber}`); // Solicita uma página específica
          if (!response.ok) {
            throw new Error("Erro ao buscar os anúncios");
          }

          const data = await response.json();
          allAnuncios = [...allAnuncios, ...data.content]; // Concatena os anúncios

          pageNumber = data.number + 1; // Próxima página
          totalPages = data.totalPages;
        }

        setAnuncios(allAnuncios);
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
