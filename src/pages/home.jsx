import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Home</h2>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default Home;
