import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers').then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post('http://localhost:3001/createUser', { name, age, username }).then((response) => {
      alert('User Created');
      setListOfUsers([...listOfUsers, { name, age, username }]);
    });

  };

  return (
    <>
      <div className='App'>
        <div className='Display'>
          {listOfUsers.map((user, index) => (
            <div key={index}>
              <h1>name: {user.name}</h1>
              <h1>age: {user.age}</h1>
              <h1>username: {user.username}</h1>
            </div>
          ))}
        </div>

        <div>
          <input
            type='text'
            placeholder='name'
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type='number'
            placeholder='age'
            onChange={(event) => setAge(event.target.value)}
          />
          <input
            type='text'
            placeholder='username'
            onChange={(event) => setUsername(event.target.value)}
          />
          <button onClick={createUser}>Add</button>
        </div>
      </div>
    </>
  );
}

export default App;
