import React, { useState } from 'react';
import GhostInput from './GhostInput';
import provincesData from './cities.json';
import './App.css'; 

function App() {
  const [province, setProvince] = useState('');

  return (
    <div className="App">
      <div className="form-container">
        <h1></h1>
        <GhostInput
      
          data={provincesData}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder="CIty"
        />
    
      </div>
    </div>
  );
}

export default App;