import styles from "./AnuncioCard.module.css";

const AnuncioCard = ({
  titulo,
  cidade,
  descricao,
  valor,
  uf,
  nomeAnunciante,
  telefoneAnunciante,
  imageUrl,
}) => {
  return (
    <div className={styles.anuncio_card}>
      <img src={imageUrl} alt="anuncio de caro" />
      <h2>{titulo}</h2>
      <p>
        Publicado por: <strong>{nomeAnunciante}</strong>
      </p>
      <p>Contato: {telefoneAnunciante}</p>
      <p>
        {valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p>{descricao}</p>
      <p>
        {cidade} - {uf}
      </p>
    </div>
  );
};

export default AnuncioCard;
