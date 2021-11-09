const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const posts = [];
let id = 0;

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.post('/api/guestbook', (req, res) => {
    id += 1;
    posts.unshift({
      "id": id,
      "name": req.body.name,
      "message": req.body.message
    });
    res.send("Successfully Posted")
  });

  server.get('/api/guestbook', (req, res) => {
    res.json({
      "posts": posts
    });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log('> Ready on http://localhost:3000');
  })
}).catch((ex) => {
  // eslint-disable-next-line no-console
  console.error(ex.stack)
  process.exit(1)
});
