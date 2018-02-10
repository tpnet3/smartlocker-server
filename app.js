var express = require('express');
var multer  = require('multer');
var path  = require('path');
var upload = multer({ dest: 'temp/' });
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const child_process = require('child_process');
var mv = require('mv');
const url = require('url');
const querystring = require('querystring');
var zipFolder = require('zip-folder');

var app = express()

app.post('/upload', upload.single('file'), function (req, res, next) {
  const id = uuidv4();
  const key = new Buffer(id).toString('base64');
  const originalpath = `temp/${id}/${req.file.originalname}`;

  fs.mkdirSync(`locked/${id}`);
  fs.writeFileSync(`locked/${id}/license.key`, key);

  mv(req.file.path, originalpath, {mkdirp: true}, function(err) {
    try {
      child_process.execFileSync('SmartLocker.exe', [id, key, path.join(__dirname, originalpath)]);

      const result = {
        id: id,
        filename: req.file.originalname,
        zip: `/download.zip`,
        exe: `/download/${id}/${req.file.originalname}`,
        key: `/download/${id}/license.key`
      };

      if (req.query.redirect) {
        res.redirect(req.query.redirect + '?' + querystring.stringify(result));
      } else {
        res.send(result);
      }
    } catch (error) {
      res.send({
        error: 'ERROR'
      })
    }
  });
})

app.get('/download/:id/download.zip', function (req, res, next) {
  const zipPath = path.join(__dirname, '/temp', req.params.id, 'download.zip');

  zipFolder(
    path.join(__dirname, '/locked', req.params.id),
    zipPath,
    function(err) {
      if(err) {
        res.status(404).send();
      } else {
        res.sendFile(zipPath);
      }
    }
  );
})

app.get('/download/:id/:file', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/locked', req.params.id, req.params.file));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
