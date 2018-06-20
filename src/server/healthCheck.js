const bodyParser = require('body-parser');

export default (app) => {
  app.get('/api/healthcheck', bodyParser.json(), (req, res) => {
    res.json({ message: 'BaanStory Health check' });
  });
};
