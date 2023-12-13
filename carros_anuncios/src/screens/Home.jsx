import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useFetchAnuncios } from "../hooks/useFetchAnuncios";
import AnuncioCard from "../components/AnuncioCard";

const Home = () => {
  const { anuncios, isLoading } = useFetchAnuncios();

  if (isLoading) {
    return <p>Carregando..</p>;
  }

  return (
    <>
      <h1>Anúncios:</h1>
      {anuncios.length == 0 && <h1>Nenhum anúncio foi encontrado!</h1>}
      <div className={styles.container_anuncios}>
        {anuncios &&
          anuncios.map((anuncio) => (
            <AnuncioCard
              key={anuncio.id}
              titulo={anuncio.titulo}
              descricao={anuncio.descricao}
              cidade={anuncio.cidade}
              valor={anuncio.valor}
              uf={anuncio.uf}
              nomeAnunciante={anuncio.nomeAnunciante}
              telefoneAnunciante={anuncio.telefone_anunciante}
              imageUrl={anuncio.image_url}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
