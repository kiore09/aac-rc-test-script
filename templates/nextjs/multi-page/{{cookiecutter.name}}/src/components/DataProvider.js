{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-19-2024
Description: Data Provider component sets tableData and stores it in session storage for application
===========================================================================
*/
"use client"
import { createContext, useContext, useState } from 'react';
import sampleData from '../../public/data/sampleData'

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const storedData = JSON.parse(sessionStorage.getItem('updatedTableData'));
  const [tableData, setTableData] = useState(storedData ? storedData : sampleData);

  return (
    <DataContext.Provider value={{ tableData, setTableData }}>
      { children }
    </DataContext.Provider>
  )
}

export default DataProvider;

export const TableData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
{% endraw %}
