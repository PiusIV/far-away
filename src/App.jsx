/* eslint-disable react/prop-types */
import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Power Bank", quantity: 1, packed: false },
// ];

// const numero = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    //? A Guard Clause when there is no input on description
    if (!description) return;

    const newItems = { description, quantity, packed: false, id: Date.now() };
    console.log(newItems);
    console.log(newItems.description);

    onAddItems(newItems);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form action="" className="add-form" onSubmit={(e) => e.preventDefault()}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name=""
        id=""
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
        {/* {numero.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))} */}
      </select>
      <input
        type="text"
        name=""
        id=""
        placeholder="Itemmm..."
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescription(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      {/* // eslint-disable-next-line react/prop-types */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
