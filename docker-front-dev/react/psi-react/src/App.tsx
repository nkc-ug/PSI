import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/profile';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* ルーティング設定 */}
        <Routes>
          <Route path="/profile" element={<Profile />} /> {/* /profileページ */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
