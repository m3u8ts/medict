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
    file.download(options, async (err, data) => {
      await res.setHeader('Conent-Type', fileType.fromBuffer(data));
      res.write(data);
      res.end();
    });
  });
};
