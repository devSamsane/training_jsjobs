const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4201;

let data = require('./jobs');
let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  next();
});

const api = express.Router();
api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const job = getAllJobs().filter(j => j.id === id);
  if (job.length === 1) {
    res.json({ success: true, job: job[0]});
  } else {
    res.json({ success: false, message: 'Aucun job trouvé avec id = ' + id});
  }
})

api.post('/jobs', (req, res) => {
  const job = req.body;
  addedJobs = [job, ...addedJobs];
  console.log('Nombre de jobs: ', getAllJobs().length);
  res.json(job);
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
