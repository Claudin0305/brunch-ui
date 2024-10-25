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
      {data && <div className="flex flex-col items-center mt-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Thermomètre de la Collecte de Fonds: BRUNCH 2024</h1>

        {/* Barre horizontale pour l'objectif */}
        <div className="relative w-3/5 my-10">
          <div className="w-full h-2 border-b-4 border-dashed border-green-500" />
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 font-bold text-red-600 text-xl">
            Objectif : ${data?.objectif}
          </div>
        </div>

        {/* Thermomètres */}
        <div className="flex justify-center items-center space-x-10">
          {/* Thermomètre des montants promis */}
          <div className="flex flex-col  space-x-0 space-y-10">
            <p className='font-bold text-blue-800 text-xl'>Don promis: ${data?.promesse}</p>
            <p className='text-red-600 text-xl font-bold'>Don reçus: ${data?.don}</p>
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
          <div className="relative w-24 h-96 bg-gray-200">
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 font-bold text-green-500 text-lg">
              Don et promesse de don reçu
            </div>
            <div
              className="absolute bottom-0 w-full bg-red-600 transition-all duration-500 ease-in-out"
              style={{ height: `100%` }}
            />
            <div className="bg-blue-800" style={{ height: `${pourcentagePromesses}%` }}></div>
            <div className="bg-red-600" style={{ height: `${pourcentageRecus}%` }}></div>
            <p className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 font-bold text-red-600">
              ${data?.don + data?.promesse}
            </p>
          </div>
        </div>
      </div>}
      {/* <div className='flex flex-col'>
      {data && <div className='md:pl-12 flex flex-col md:flex-row mb-8 space-y-8 space-x-0 md:space-x-8 md:space-y-0 tex-white'>
        <p className='text-xl w-full md:w-1/3 bg-red-600 text-center p-4 rounded-lg text-white'><span className='font-semibold'>Objectif:</span>{data.objectif} $CA</p>
        <p className='text-xl w-full md:w-1/3 bg-gray-200 text-center p-4 rounded-lg text-gray-900'><span className='font-semibold'>Promesses:</span>{data.promesse} $CA</p>
        <p className='text-xl w-full md:w-1/3 bg-lime-600 text-center p-4 rounded-lg text-white'><span className='font-semibold'>Dons:</span>{data.don} $CA</p>
      </div>
      }


       <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data_}>

        <Tooltip />
        <Legend />
          <Bar dataKey="Objectif" fill="#dc2626" barSize={100} />
          <Bar dataKey="Dons" fill="#65a30d" barSize={100} />
          <Bar dataKey="Promesses" fill="#d1d5db" barSize={100} />
      </BarChart>
    </ResponsiveContainer>

    </div> */}
      {/* {data && <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-[#1F4E79] mb-8">
          Thermomètre de la Collecte de Fonds: BRUNCH 2024
        </h1>


        <div className="w-3/5 mx-auto my-10 relative">
          <div className="h-2 border-b-4 border-dashed border-[#4CAF50]" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[#D62828] font-bold text-xl">
            Objectif : ${data?.objectif}
          </div>
        </div>

        <div className="flex justify-center items-end space-x-16 w-3/5 mx-auto">

          <div className="relative w-24 h-96 bg-gray-300">
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 font-bold text-[#4CAF50]">
              Montant promis
            </div>
            <div
              className="absolute bottom-0 w-full bg-[#1F4E79] transition-all duration-500 ease-in-out"
              style={{ height: `${pourcentagePromesses}%` }}
            />
            <div className="absolute bottom-[calc(100%-${pourcentagePromesses}%)] left-1/2 transform -translate-x-1/2 text-white font-bold">
              ${data?.promesse}
            </div>
            <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-[#1F4E79] font-bold">
              ${data?.promesse}
            </div>
          </div>

          <div className="relative w-24 h-96 bg-gray-300">
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 font-bold text-[#4CAF50]">
              Montant reçu
            </div>
            <div
              className="absolute bottom-0 w-full bg-[#D62828] transition-all duration-500 ease-in-out"
              style={{ height: `${pourcentageRecus}%` }}
            />
            <div className="absolute bottom-[calc(100%-${pourcentageRecus}%)] left-1/2 transform -translate-x-1/2 text-white font-bold">
              ${data?.don}
            </div>
            <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-[#D62828] font-bold">
              ${data?.don}
            </div>
          </div>
        </div>
      </div>} */}
      {data &&
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data_}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Promesses" stackId="a" fill="#1e40af" />
            <Bar dataKey="Dons" stackId="a" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>}
    </>
  );
};

export default Barometer;
