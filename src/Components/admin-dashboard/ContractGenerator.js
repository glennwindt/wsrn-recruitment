// src/components/AdminDashboard/ContractGenerator.js

import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ContractGenerator = ({ userData }) => {
  const [language, setLanguage] = useState('en');
  const [contract, setContract] = useState(null);

  const generateContract = () => {
    const generatedContract = {
      userId: userData.uid,
      language,
      content: generateContractContent(userData, language),
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    setContract(generatedContract);
    
    // Save to Firebase
    const contractRef = doc(db, "contracts", userData.uid);
    setDoc(contractRef, generatedContract);
  };

  const generateContractContent = (data, lang) => {
    if (lang === 'pt') {
      return `
        CONTRATO DE TRABALHO

        Por este instrumento particular de contrato de trabalho, celebrado entre:

        ${data.companyName}, com sede em ${data.address}, representada por ${data.adminName},
        e

        ${data.firstName} ${data.lastName}, nacionalidade: ${data.nationality},
        número de passaporte: ${data.passportNumber},
        NIF: ${data.nif || '________'},
        cargo: ${data.position},

        Regras do contrato:
        - Salário mensal: €${data.salary}
        - Data início: ${data.startDate}
        - Duração: ${data.contractDuration} meses
        - Benefícios: ${data.benefits.join(', ')}

        Assinado digitalmente em Lisboa, Portugal, aos ${new Date().toLocaleDateString()}
      `;
    } else {
      return `
        EMPLOYMENT CONTRACT

        This employment agreement is made between:

        ${data.companyName}, located at ${data.address}, represented by ${data.adminName},
        and

        ${data.firstName} ${data.lastName}, nationality: ${data.nationality},
        passport number: ${data.passportNumber},
        NIF: ${data.nif || '________'},
        position: ${data.position},

        Terms:
        - Monthly salary: €${data.salary}
        - Start date: ${data.startDate}
        - Duration: ${data.contractDuration} months
        - Benefits: ${data.benefits.join(', ')}

        Digitally signed in Lisbon, Portugal, on ${new Date().toLocaleDateString()}
      `;
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Generate Employment Contract</h2>
      
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>

      <button 
        onClick={generateContract}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate Contract
      </button>

      {contract && (
        <pre className="mt-4 whitespace-pre-wrap border p-4 rounded bg-gray-100">
          {contract.content}
        </pre>
      )}
    </div>
  );
};

export default ContractGenerator;