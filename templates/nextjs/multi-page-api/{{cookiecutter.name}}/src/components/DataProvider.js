{% raw %}
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-19-2024
Description: Data Provider component fetches data from sample API and stores it in session storage for application
===========================================================================
*/
"use client"
import { createContext, useContext, useEffect, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    const storedData = JSON.parse(sessionStorage.getItem('updatedTableData'));
    if (storedData) {
      setTableData(storedData);
    } else {
      fetchData();
    }
  }, []);

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
