
import { useState, MouseEvent } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Classification par civilité',
    },
  },
};
export const optionsAffiliation = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Classification par Affiliation',
    },
  },
};
export const optionsVille = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Classification par Ville',
    },
  },


};
export const optionsPays = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Classification par pays',
    },
  },


};



type Props = {
  data: any;
};
const StatParticipant: React.FC<Props> = ({ data }) => {

const civilites:any[] = [], pays:any[]=[], affiliations:any[]=[], villes:any[]=[];
data?.forEach((p:any)=>{
  civilites.push(p.nomCivilite);
  pays.push(p.nomPays);
  villes.push(p.ville.libelle)
  affiliations.push(p.nomAffiliation);
})
const tableauSansDoublons = civilites.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }

  return acc;
}, []);
const tableauSansDoublonsAff = affiliations.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }

  return acc;
}, []);
const tableauSansDoublonsVil = villes.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }

  return acc;
}, []);
const tableauSansDoublonsPay = pays.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }

  return acc;
}, []);
let dataCivil: any = {}, dataAffiliation: any = {}, dataVille:any={}, dataPays:any={};
tableauSansDoublons.forEach((ele:any)=>{
  const result = data?.filter((e:any)=> e.nomCivilite === ele);
  dataCivil = {...dataCivil, [ele]: result.length/data.length*100}
})
let tot = 0;
tableauSansDoublonsAff.forEach((ele:any)=>{

  const result = data?.filter((e:any)=> e.nomAffiliation === ele);
  dataAffiliation = {...dataAffiliation, [ele]: result.length/data.length*100}
})
// console.log(dataAffiliation, tableauSansDoublonsAff)
tableauSansDoublonsVil.forEach((ele:any)=>{
  const result = data?.filter((e:any)=> e.ville.libelle === ele);
  dataVille = {...dataVille, [ele]: result.length/data.length*100}
})
tableauSansDoublonsPay.forEach((ele:any)=>{
  const result = data?.filter((e:any)=> e.nomPays === ele);
  dataPays = {...dataPays, [ele]: result.length/data.length*100}
})

// console.log(civilites, tableauSansDoublons, dataCivil);
//   console.log(data)
  const dataCivilite = {
  labels:tableauSansDoublons,
  datasets: [
    {
      label: '% par Civilité',
      data: [...tableauSansDoublons.map((e:any)=>dataCivil[e])],
      backgroundColor: ["rgba(255, 99, 132, 0.5)", "Orange", "Yellow", "Green", "Purple", "Blue"]
      // backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
    },

  ],
}
const labelsAffiliation: any = [];
tableauSansDoublonsAff.forEach((e:any)=>{
  if(e === null){
    labelsAffiliation.push("Aucune aff.")
  }else{
    labelsAffiliation.push(e);
  }
})
const dataAff = {
labels:labelsAffiliation,
datasets: [
  {
    label: '% par Affiliation',
    data: [...tableauSansDoublonsAff.map((e:any)=>dataAffiliation[e])],
    backgroundColor: ["rgba(255, 99, 132, 0.5)", "Orange", "Yellow", "Green", "Purple", "Blue"]
    // backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
  },

],
}
const dataV = {
labels:tableauSansDoublonsVil,
datasets: [
  {
    label: '% par Ville',
    data: [...tableauSansDoublonsVil.map((e:any)=>dataVille[e])],
    backgroundColor: ["rgba(255, 99, 132, 0.5)", "Orange", "Yellow", "Green", "Purple", "Blue"]
    // backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
  },

],
}
const dataP = {
labels:tableauSansDoublonsPay,
datasets: [
  {
    label: '% par pays',
    data: [...tableauSansDoublonsPay.map((e:any)=>dataPays[e])],
    backgroundColor: ["rgba(255, 99, 132, 0.5)", "Orange", "Yellow", "Green", "Purple", "Blue"]
    // backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
  },

],
}
const keysCivilite = Object.keys(dataCivil);
const keysAffiliation = Object.keys(dataAffiliation);
const keysVille = Object.keys(dataVille);
const keysPays = Object.keys(dataPays);
// console.log(keysCivilite);
// console.log(dataCivil[keysCivilite[0]] * data?.length/100)
const DetailsCivilite = ()=>{
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
      {
        keysCivilite.map((c:any)=>(<p key={c} className=""><span className="text-gray-500">{c}: </span><span></span>{Math.round(dataCivil[c] * data?.length/100)}</p>))
      }
    </div>
  )
}
const DetailsAffiliation = ()=>{
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
      {
        keysAffiliation.map((c:any)=>(<p key={c} className=""><span className="text-gray-500">{c=== 'null' ? 'Aucune aff.(null)' : c}: </span><span></span>{Math.round(dataAffiliation[c] * data?.length/100)}</p>))
      }
    </div>
  )
}
const DetailsVille = ()=>{
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
      {
        keysVille.map((c:any)=>(<p key={c} className=""><span className="text-gray-500">{c}: </span><span></span>{Math.round(dataVille[c] * data?.length/100)}</p>))
      }
    </div>
  )
}
const DetailsPays = ()=>{
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
      {
        keysPays.map((c:any)=>(<p key={c} className=""><span className="text-gray-500">{c}: </span><span></span>{Math.round(dataPays[c] * data?.length/100)}</p>))
      }
    </div>
  )
}
return (
    <> <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-1 md:gap-4">
      {/* <div className="md:col-span-2">
        <Bar options={options} data={dataCivilite} />
        <DetailsCivilite/>
      </div> */}
      <div className="">
        <Bar options={optionsAffiliation} data={dataAff} />
        <DetailsAffiliation/>
      </div>
      <div className="">
        <Bar options={optionsVille} data={dataV} />
        <DetailsVille/>
      </div>
      <div className="">
        <Bar options={optionsPays} data={dataP} />
        <DetailsPays/>
      </div>
    </div>
    </div>
    </>
  );
};

export default StatParticipant;
