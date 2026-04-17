import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Globe, RefreshCw } from 'lucide-react';

function App() {
  const [currentStats, setCurrentStats] = useState({});
  const [dataHistory, setDataHistory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/health');
      const newDataPoint = {
        time: new Date().toLocaleTimeString().split(' ')[0],
        ...response.data.latency_ms
      };
      setCurrentStats(response.data.latency_ms);
      setDataHistory(prev => [...prev, newDataPoint].slice(-15));
    } catch (error) {
      console.error("API Connection Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex items-center gap-4 mb-10">
          <Activity className="text-blue-600 w-10 h-10" />
          <h1 className="text-4xl font-bold tracking-tight">Global Latency Monitor</h1>
        </header>

        {/* STATS CARDS - With explicit styling for high-end look */}
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '1.5rem', 
  marginBottom: '2.5rem' 
}}>
  {currentStats && Object.keys(currentStats).length > 0 ? (
    Object.entries(currentStats).map(([city, value]) => (
      <div key={city} style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '140px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
          <Globe size={20} color="#3b82f6" />
          <span style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>{city}</span>
        </div>
        <div style={{ 
          fontSize: '36px', 
          fontFamily: 'monospace', 
          fontWeight: '900', 
          textAlign: 'right',
          color: value > 150 ? '#ef4444' : '#2563eb' 
        }}>
          {value}<span style={{ fontSize: '14px', marginLeft: '4px', color: '#94a3b8', fontFamily: 'sans-serif' }}>ms</span>
        </div>
      </div>
    ))
  ) : (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
       <RefreshCw className="animate-spin" style={{ margin: '0 auto 10px', color: '#3b82f6' }} />
       <p>Syncing with Global Edge Nodes...</p>
    </div>
  )}
</div>

        {/* TREND CHART */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100" style={{ height: '450px' }}>
          <h2 className="text-lg font-bold mb-6 text-gray-700">Real-Time Performance Trends</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickMargin={10} minTickGap={50} />
              <YAxis stroke="#94a3b8" fontSize={12} unit="ms" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="Dublin" stroke="#2563eb" strokeWidth={4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="New York" stroke="#db2777" strokeWidth={4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="Tokyo" stroke="#10b981" strokeWidth={4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default App;