const customers = [
  {
    id: '001',
    firstName: 'Jaime',
    lastName: 'Jae',
    birthDate: '01/01/2022',
  },
  {
    id: '002',
    firstName: 'Jorah',
    lastName: 'Johnson',
    birthDate: '01/01/2022',
  },
  {
    id: '003',
    firstName: 'Joseph',
    lastName: 'Ayobami',
    birthDate: '01/01/2022',
  },
];
const items = [
  {id: '001', name: 'Mango', price: 23},
  {id: '002', name: 'Orange', price: 50},
  {id: '003', name: 'Pawpaw', price: 30},
];
const orders = [
  {id: '001', createdTime: '01/01/2022', customer: '001', items: items},
  {id: '002', createdTime: '01/01/2022', customer: '001', items: items},
  {id: '003', createdTime: '01/01/2022', customer: '002', items: items},
  {id: '004', createdTime: '01/01/2022', customer: '003', items: items},
];

module.exports = {customers, items, orders};
