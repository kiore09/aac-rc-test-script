/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-07-2024
Description: This function is part of the unit testing framework
demonstration. It implements a service that another class depends on. In
particular, this service adds two integers together.
===========================================================================
*/

const add2Numbers = (x: number, y: number): number => {
  return x + y;
};

export { add2Numbers };
