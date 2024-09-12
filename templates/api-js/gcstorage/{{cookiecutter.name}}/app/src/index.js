const server = require('./server');
const config = require('../config');

const PORT = config.port;

//Initialize Server
server.listen(PORT, () => {
  console.log(`Application running at http://localhost:${PORT}`);
});