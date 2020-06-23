const { promisify } = require('util');
const megajs = require('megajs');
const fileType = require('file-type');

module.exports = async (req, res) => {
  let link = decodeURIComponent(req.query.link);
  let file = megajs.file(link);
  const options = {
    maxConnections: 10,
    initialChunkSize: 64000,
    chunkSizeIncrement: 64000,
    maxChunkSize: 1000000,
    returnCiphertext: false
  };

  file.loadAttributes((err, file) => {
    file.download(options, (err, data) => {
      res.write(data);
      let ft = async fromBuffer(data);
      res.setHeader('Conent-Type', await fileType.fromBuffer(data));
      res.end();
    });
  });
};
