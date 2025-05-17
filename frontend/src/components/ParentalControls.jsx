// components/ParentalControls.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParentalControls = () => {
  const [enabled, setEnabled] = useState(false);
  const [ageLimit, setAgeLimit] = useState('');
  const [message, setMessage] = useState('');

  // Fetch current settings on mount
  useEffect(() => {
    axios.get('/api/parental-controls')
      .then(res => {
        setEnabled(res.data.enabled);
        setAgeLimit(res.data.ageLimit || '');
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load settings.');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    // Simple validation
    if (enabled && (ageLimit === '' || isNaN(ageLimit) || ageLimit < 0)) {
      setMessage('Please enter a valid age limit.');
      return;
    }
    try {
      const payload = { enabled, ageLimit: enabled ? ageLimit : 0 };
      await axios.put('/api/parental-controls', payload);
      setMessage('Settings updated successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Error updating settings.');
    }
  };

  return (
    <div>
      <h2>Parental Controls</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(prev => !prev)}
          />
          Enable Parental Controls
        </label>

        {enabled && (
          <div>
            <label>
              Age Limit:
              <input
                type="number"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
                min="0"
                required
              />
            </label>
          </div>
        )}
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ParentalControls;
