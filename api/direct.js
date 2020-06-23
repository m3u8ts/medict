const megajs = require('megajs');
const mime = require('mime');

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
    async file.download(options).pipe(res.write())
    .then {
      res.setHeader('Conent-Type', mime.type(file.name));
      res.end();
    }
    .catch (err) {
      console.log(err);
    };
  });
}
