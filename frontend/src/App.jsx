import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Globe, RefreshCcw } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/health');
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Activity size={32} color="#0070f3" />
        <h1>Global Latency Monitor</h1>
      </header>

      <button 
        onClick={fetchHealth}
        style={{ padding: '10px 20px', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <RefreshCcw size={16} /> Refresh Stats
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {data.map((item) => (
          <div key={item.region} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
              <Globe size={18} />
              <h3 style={{ margin: 0 }}>{item.region}</h3>
            </div>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3', marginTop: '10px' }}>
              {item.latency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;