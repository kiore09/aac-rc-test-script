/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-05-2024
Description: This file is part of the birthday controller to calculates 
how many days until a birthday based on your date of birth
===========================================================================
*/

'use-strict'

const calculateDateDiff = (month: number, day: number): number => {
  const currentDate: Date = new Date();
  // Subtract 1 from month as January = 0
  const userDate: Date = new Date(currentDate.getFullYear(), month - 1, day);
  // Computes the remaining days
  const diffTime: number = userDate.getTime() - currentDate.getTime();
  let diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays < 0) {
    diffDays += 365;
  }
  return diffDays;
};

export default calculateDateDiff;
