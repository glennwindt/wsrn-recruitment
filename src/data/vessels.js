// src/data/vessels.js

export const vessels = [
  {
    id: 'vsl001',
    name: 'Atlantic Voyager',
    type: 'Cargo',
    subtype: 'Container Ship',
    length: '294m',
    weight: '87,000 DWT',
    flag: 'Panama',
    shippingCompany: {
      id: 'sc001',
      name: 'Global Maritime Logistics',
      country: 'Germany',
      contactEmail: 'ops@gml.com',
      contactPhone: '+49 123 4567'
    }
  },
  {
    id: 'vsl002',
    name: 'Island Breeze',
    type: 'Passenger',
    subtype: 'Inter-Island Ferry',
    length: '65m',
    weight: '4,800 GT',
    flag: 'Portugal',
    shippingCompany: {
      id: 'sc002',
      name: 'LisSea Travels',
      country: 'Portugal',
      contactEmail: 'contact@lissea.pt',
      contactPhone: '+351 987 654 321'
    }
  }
  // Add more vessels as needed
];

