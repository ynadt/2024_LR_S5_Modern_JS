import styles from './Card.module.css';

const Card = ({ name, description }: { name: string; description?: string }) => {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
