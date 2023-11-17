// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post('http://localhost:8000/items/', { name, description });
      fetchItems();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const editItem = (id, name, description) => {
    setEditItemId(id);
    setName(name);
    setDescription(description);
  };

  const updateItem = async () => {
    try {
      await axios.put(`http://localhost:8000/items/${editItemId}/`, { name, description });
      fetchItems();
      setEditItemId(null);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/items/${id}/`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => editItem(item.id, item.name, item.description)}>
              Edit
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>{editItemId ? 'Edit Item' : 'Add New Item'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editItemId ? (
          <button onClick={updateItem}>Update</button>
        ) : (
          <button onClick={addItem}>Add</button>
        )}
      </div>
    </div>
  );
};

export default App;
