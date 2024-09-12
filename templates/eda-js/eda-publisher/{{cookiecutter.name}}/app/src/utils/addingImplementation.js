/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-04-2022
Description: This function is part of the unit testing framework
demonstration. It implements a service that another class depends on. In
particular, this service adds two integers together.
===========================================================================
*/

const add2Numbers = ( x, y ) => {
  return x + y;
};

module.exports = {add2Numbers};
