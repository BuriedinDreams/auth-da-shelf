import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {
  const [shelfItems, setShelfItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemUrl, setItemUrl] = useState('');

  useEffect(() => {
    loadShelf();
  }, []);
  const loadShelf = () => {
    // Grab shelf items from db
    axios
      .get('/api/shelf')
      .then((res) => {
        setShelfItems(res.data);
      })
      .catch((err) => {
        console.error('error on get shelf', err);
      });
  };
  // On submit will post the
  const onSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post('/api/shelf', {
        name: itemName,
        description: itemDescription,
        image_url: itemUrl,
      })
      .then((res) => {
        console.log(res);
        loadShelf();
      })
      .catch((err) => console.error(err));
  };
  const deleteBook = (bookID) => {
    axios
      .delete(`/api/shelf/${bookID}`)
      .then((res) => {
        console.log('successful Delete: ShelfPage', res);
        loadShelf();
      })
      .catch((error) => {
        console.log('error on deleteBook: ShelfPage', error);
      });
  };
  const editShelf = (item) => {
    axios
      .put(`/api/shelf`, {
        name: itemName,
        description: itemDescription,
        image_url: itemUrl,
      })
      .then((res) => {
        console.log(res, 'response on put client');
        loadShelf();
      })
      .catch((err) => {
        console.log('error on put client', err);
      });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here. test</p>
      <ul>
        {shelfItems.map((items) => (
          <li key={items.id}>
            {' '}
            {items.description}
            {items.image_url}
            <button
              onClick={() => {
                deleteBook(items.id);
              }}
            >
              {' '}
              TRASH
            </button>{' '}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        {' '}
        Add a new item
        <input
          value={itemName}
          placeholder="name"
          onChange={(evt) => setItemName(evt.target.value)}
        />
        <input
          value={itemDescription}
          placeholder="description"
          onChange={(evt) => setItemDescription(evt.target.value)}
        />{' '}
        <input
          value={itemUrl}
          placeholder="URL"
          onChange={(evt) => setItemUrl(evt.target.value)}
        />
        <button>Add Item!!</button>
      </form>
    </div>
  );
}

export default ShelfPage;
