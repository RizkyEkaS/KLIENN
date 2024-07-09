import React, { useState, useReducer, useCallback, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Table from './komponen/tabel';
import Homepage from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import NotFound from './pages/NotFound';
import useFetch from './hook/useFetch';
import useCustomTitle from './hook/useCustomTitle';
import useCounter from './hook/useCounter';
import useForm from './hook/useForm';
import AuthProvider from './context/AuthContext';
import Login from './komponen/Login';
import UserProfile from './komponen/UserProfile';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store'; // Pastikan path ke store.js sesuai dengan struktur proyek Anda

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [data, setData] = useState([]);
  const { counter, increment, decrement } = useCounter();
  const { values, handleChange, resetForm } = useForm({ nim: '', nama: '' });
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const memoizedValue = useMemo(() => state.count * 2, [state.count]);
  const callbackFunction = useCallback(() => {
    console.log('Callback function called');
  }, []);
  
  useCustomTitle('Aplikasi Mahasiswa');

  useFetch('https://jsonplaceholder.typicode.com/users', setData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, values]);
    resetForm();
  };

  return (
    <AuthProvider>
      <div className="container">
        <header className="header">
          <h1>Welcome to Aplikasi</h1>
          <p>Nama: Rizky Eka Septiandi</p>
          <p>NIM: A11.2021.13889</p>
        </header>
        
        <form className="form" onSubmit={handleSubmit}>
          <label>NIM:</label>
          <input
            type="text"
            name="nim"
            value={values.nim}
            onChange={handleChange}
            ref={inputRef}
            required
          />
          <label>Nama:</label>
          <input
            type="text"
            name="nama"
            value={values.nama}
            onChange={handleChange}
            required
          />
          <button type="submit">Tambahkan Data</button>
        </form>

        <Table className="table" data={data} />
        <div className="counter-container">
          <p>Counter: {counter}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
        <div className="reducer-container">
          <p>Reducer Count: {state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>Increment Reducer</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>Decrement Reducer</button>
        </div>
        <div className="memo-container">
          <p>Memoized Value: {memoizedValue}</p>
          <button onClick={callbackFunction}>Call Callback</button>
        </div>

        <Login />
        <UserProfile />

        <Router>
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/notfound">NotFound</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
