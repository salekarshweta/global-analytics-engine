import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Globe, RefreshCw } from 'lucide-react';


function App() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/health");
        
        // --- DATA RE-WIRING ---
        // We transform the nested API data into a format the Chart & Cards can use
        const processedData = response.data.map(item => ({
          name: item.region,
          latency: item.metrics.latency,
          traffic: item.metrics.traffic,
          saturation: item.metrics.saturation,
          prediction: item.prediction, // "stable", "unstable", or "degraded_risk"
          timestamp: new Date().toLocaleTimeString()
        }));

        setStats(processedData);
      } catch (error) {
        console.error("Inbound Telemetry Error:", error);
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white font-sans">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2"><span className="text-blue-500">
          Global Infrastructure NOC</span>
        </h1>
      
      {/* REGIONAL STATUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((region) => (
          <div key={region.name} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold"><span className="text-gray-400">{region.name}</span></h2>
              {/* --- INTELLIGENCE BADGE --- */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                region.prediction === 'stable' ? 'bg-green-900 text-green-400' : 
                region.prediction === 'unstable' ? 'bg-yellow-900 text-yellow-400' :
                'bg-red-900 text-red-400 animate-pulse'
              }`}>
                {region.prediction}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-400">Latency: <span className="text-white font-mono">{region.latency}ms</span></p>
              <p className="text-gray-400">Traffic: <span className="text-white font-mono">{region.traffic} RPS</span></p>
              <p className="text-gray-400">Saturation: <span className="text-white font-mono">{(region.saturation * 100).toFixed(0)}%</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Real-time Latency Stream (ms)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Line type="monotone" dataKey="latency" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;