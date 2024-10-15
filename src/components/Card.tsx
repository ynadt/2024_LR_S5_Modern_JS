const Card = ({ name, description }: { name: string; description?: string }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
