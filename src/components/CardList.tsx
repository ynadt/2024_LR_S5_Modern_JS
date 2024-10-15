import { ListItem } from '@/types/types.ts';
import Card from '@components/Card.tsx';

const CardList = ({ items }: { items: ListItem[] }) => {
  return (
    <div className="card-container">
      {items.map((item, index) => (
        <Card key={index} name={item.name} description={item.description} />
      ))}
    </div>
  );
};

export default CardList;
