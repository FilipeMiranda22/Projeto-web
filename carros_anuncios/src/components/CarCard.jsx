import styles from "./CarCard.module.css";
import { Link } from "react-router-dom";

const CarCard = ({ nome, imageUrl, marca, cor, descricao, id, onDelete }) => {
  return (
    <div className={styles.car_card}>
      <img src={imageUrl} alt="anuncio de carro" />
      <h2>{nome}</h2>
      <p>{marca}</p>
      <p>{cor}</p>
      <p>{descricao}</p>

      <div className={styles.action_buttons}>
        <Link
          className={`btn btn-outline ${styles.link}`}
          to={`/register/anuncio/${id}`}
        >
          Anunciar
        </Link>
        <Link
          className={`btn btn-outline ${styles.link}`}
          to={`/car/editar/${id}?nome=${nome}&marca=${marca}&cor=${cor}&descricao=${descricao}&imageUrl=${imageUrl}`}
        >
          Editar
        </Link>
        <button className="btn btn-outline btn-danger" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CarCard;
