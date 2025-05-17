// components/GameLibrary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameLibrary = () => {
  const [games, setGames] = useState([]);
  const [installed, setInstalled] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch games and installed games on load
  useEffect(() => {
    fetchGames();
    fetchInstalled();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get('/api/games');
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInstalled = async () => {
    try {
      const res = await axios.get('/api/games/installed');
      setInstalled(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInstall = async (gameId) => {
    try {
      await axios.post(`/api/games/${gameId}/install`);
      setMessage('Game installed successfully.');
      fetchInstalled();
    } catch (err) {
      console.error(err);
      setMessage('Error installing game.');
    }
  };

  const handleUninstall = async (gameId) => {
    try {
      await axios.post(`/api/games/${gameId}/uninstall`);
      setMessage('Game uninstalled.');
      fetchInstalled();
    } catch (err) {
      console.error(err);
      setMessage('Error uninstalling game.');
    }
  };

  const handleUpdate = async (gameId) => {
    try {
      const res = await axios.post(`/api/games/${gameId}/update`);
      setMessage(res.data.msg);
      fetchInstalled();
    } catch (err) {
      console.error(err);
      setMessage('Error updating game.');
    }
  };

  // Helper to check if a game is installed and get its data
  const findInstalled = (gameId) => {
    return installed.find(item => item.game._id === gameId);
  };

  return (
    <div>
      <h2>Game Library</h2>
      {message && <p>{message}</p>}

      <h3>All Games</h3>
      <ul>
        {games.map(game => {
          const installedInfo = findInstalled(game._id);
          const isInstalled = !!installedInfo;
          return (
            <li key={game._id}>
              <strong>{game.title}</strong> (Latest: v{game.latestVersion})
              {isInstalled ? (
                <>
                  <span> - Installed (v{installedInfo.version}) </span>
                  <button onClick={() => handleUninstall(game._id)}>Uninstall</button>
                  {installedInfo.version !== game.latestVersion && (
                    <button onClick={() => handleUpdate(game._id)}>Update</button>
                  )}
                </>
              ) : (
                <button onClick={() => handleInstall(game._id)}>Install</button>
              )}
            </li>
          );
        })}
      </ul>

      <h3>Installed Games</h3>
      <ul>
        {installed.map(item => (
          <li key={item.game._id}>
            {item.game.title} - Version: {item.version}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLibrary;
