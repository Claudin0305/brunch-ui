import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'

interface BarometerProps {
  objective: number;
  promises: number;
  donations: number;
}

const Barometer: React.FC = () => {
  const [state, setState] = useState<boolean>(false);
  const [data, setData] = useState<any>(null)
  const [pourcentagePromesses, setPourcentagePromesses] = useState(0);
  const [pourcentageRecus, setPourcentageRecus] = useState(0);

  useEffect(() => {
    // Calculer les pourcentages dès que les données sont disponibles
    const pourcentagePromessesCalc = Math.min((data?.promesse / data?.objectif) * 100, 100);
    const pourcentageRecusCalc = Math.min(((data?.don) / data?.objectif) * 100, 100);

    setPourcentagePromesses(pourcentagePromessesCalc);
    setPourcentageRecus(pourcentageRecusCalc);
  }, [data]);

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
    <>
      {data && <div className="flex flex-col items-center mt-8">
        {/* <h1 className="text-4xl font-bold text-blue-800 mb-8">Thermomètre de la Collecte de Fonds: BRUNCH 2024</h1> */}

        {/* Barre horizontale pour l'objectif */}
        <div className="relative w-3/5 my-4">
          <div className="w-full h-2 border-b-4 border-dashed border-[#D62828]" />
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-gray-900 text-xl">
            Objectif : ${data?.objectif}
          </div>
        </div>

        {/* Thermomètres */}
        <div className="flex justify-center items-center flex-col">
          {/* Thermomètre des montants promis */}
          <div className="flex flex-col  space-x-0 space-y-4">

            {/* <p className='text-red-600 text-xl font-bold'>Don reçus: ${data?.don}</p> */}
          </div>
          {/* <div className="relative w-24 h-96 bg-gray-200">
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 font-bold text-green-500 text-lg">
              Montant promis
            </div>
            <div
              className="absolute bottom-0 w-full bg-blue-800 transition-all duration-500 ease-in-out"
              style={{ height: `${pourcentagePromesses}%` }}
            />
            <p className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 font-bold text-blue-800">
              ${data?.promesse}
            </p>
          </div> */}

          {/* Thermomètre des montants reçus */}
          <div className="relative w-24 h-72 bg-gray-200">
            <div className="h-72 bg-gray-200 flex flex-col justify-end">
              <div className="bg-[#1F4E79] w-full mt-auto" style={{ height: `${pourcentagePromesses}%`}}></div>
              <div className="bg-[#D62828] w-full" style={{ height: `${pourcentageRecus}%` }}></div>
            </div>
            {/* <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 font-bold text-green-500 text-lg">

            </div> */}


          </div>
          <p className='text-[#1F4E79] text-xl'>Don promis: ${data?.promesse}</p>
          <p className='text-[#D62828] text-xl'>Don reçus: ${data?.don}</p>
        </div>
      </div>}

    </>
  );
};

export default Barometer;
