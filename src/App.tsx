import './App.css';
import { ListItem } from '@/types/types.ts';
import CardList from '@components/CardList.tsx';

const App = () => {
  const itemList: ListItem[] = [
    { name: 'Item 1', description: 'Item description' },
    { name: 'Item 2', description: 'Item description' },
    { name: 'Item 3', description: 'Item description' },
    { name: 'Item 4', description: 'Item description' },
    { name: 'Item 5', description: 'Item description' },
    { name: 'Item 6', description: 'Item description' },
  ];

  return (
    <div className="App">
      <CardList items={itemList} />
    </div>
  );
};

export default App;
