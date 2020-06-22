const megajs = require('megajs');
const filetype = require('file-type');

module.exports = async (req, res) => {
  let link = decodeURIComponent(req.params.link);
  let file = megajs.file(link);
  const options = {
    maxConnections: 10,
    initialChunkSize: 64000,
    chunkSizeIncrement: 64000,
    maxChunkSize: 1000000,
    returnCiphertext: false
  }

  file.loadAttributes((err, file) => {
    file.download(options, async (err, data) => {
      let ft = await filetype.fromBuffer(data);
      res.setHeader('Content-Type', ft.mime);
      res.send(data);
    });
  });
}
