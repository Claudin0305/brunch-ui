import React, { useState, useEffect } from 'react';
import { LineChart, BarChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'

interface BarometerProps {
  objective: number;
  promises: number;
  donations: number;
}

const Barometer: React.FC = () => {
  const [state, setState] = useState<boolean>(false);
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    // Définir un intervalle qui s'exécute toutes les 30 secondes (30000 ms)
    const interval = setInterval(() => {
      setState((prevState) => !prevState); // Inverser l'état précédent
    }, 30000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []); // Le tableau de dépendances vide signifie que l'effet ne s'exécute qu'une fois après le montage

  useEffect(() => {
    axios.get('/api/don-promesse-objectif').then(resp => {
      if (resp.status === 200) {
        if (resp.data.data.length > 0) {
          setData(resp.data.data[0])
        }
        // setData(resp.data.data)
        // console.log(resp.data)
      }
    }).catch((err) => {
      console.log(err);
      if (err?.response?.status === 400) {
      }

    });
  }, [state])

  // Les données du graphique
  // console.log(data)
  const data_ = [
    { name: 'Campagne 2024', Objectif: data?.objectif ?? 0, Dons: data?.don ?? 0, Promesses: data?.promesse ?? 0 },
    // { name: 'Promesses', promesse: data?.promesse ?? 0 },
    // { name: 'Dons', }
  ];

  return (
    <div className='flex flex-col'>
      {data && <div className='md:pl-12 flex flex-col md:flex-row mb-8 space-y-8 space-x-0 md:space-x-8 md:space-y-0 tex-white'>
        <p className='text-xl w-full md:w-1/3 bg-red-600 text-center p-4 rounded-lg text-white'><span className='font-semibold'>Objectif:</span>{data.objectif} $CA</p>
        <p className='text-xl w-full md:w-1/3 bg-gray-200 text-center p-4 rounded-lg text-gray-900'><span className='font-semibold'>Promesses:</span>{data.promesse} $CA</p>
        <p className='text-xl w-full md:w-1/3 bg-lime-600 text-center p-4 rounded-lg text-white'><span className='font-semibold'>Dons:</span>{data.don} $CA</p>
      </div>
      }


       <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data_}>
        {/* <CartesianGrid strokeDasharray="0 0" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
          <Bar dataKey="Objectif" fill="#dc2626" barSize={30} />
          <Bar dataKey="Dons" fill="#65a30d" barSize={30} />
          <Bar dataKey="Promesses" fill="#e5e7eb" barSize={30} />
      </BarChart>
    </ResponsiveContainer>

    </div>
  );
};

export default Barometer;
