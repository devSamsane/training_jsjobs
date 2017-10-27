const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const app = express();
const port = 4201;
const secret = 'qwertyuiopasdfghjklzxcvbnm123456';

let data = require('./jobs');
let initialJobs = data.jobs;
let addedJobs = [];

// const fakeUser = {id: 1, email: 'sm@test.com',username: 'olivier' ,password: 'pass'};
let users = [{ id: 1, email: 'sm@test.com',username: 'olivier' ,password: 'pass', role: 'admin' }, { id: 2, email: 'sm2@test.com',username: 'eothen' ,password: 'pass', role: 'user' }];

const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
  console.log('req.body', req.body);
  if (!req.body) {
    return res.status(500).json({ success: false, message: 'données manquantes' });
  }

  if (req.body) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password.toLowerCase();
    const index = users.findIndex(user => user.email === email);

    if (index < 0 || users[index].password != password) {
      return res.status(401).json({ sucess: false, message: 'identifiants incorrects' });
    }

    delete req.body.password;
    const user = users.find(user => {
      if (user.email === email) {
        user.password = ''
        return user;
      }
    });

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60), // 1 min
      iss: 'http://localhost:4201',
      role: user.role,
      email: req.body.email
    }, secret);
    return res.status(200).json({ success: true, token: token });
  }
});

auth.post('/register', (req, res) => {
  if (!req.body) {
    return res.json({ success: false, message: 'données manquantes'});
  }

  const email = req.body.email.toLocaleLowerCase().trim();
  const password = req.body.password.toLocaleLowerCase().trim();
  const username = req.body.username.toLocaleLowerCase().trim();
  const role = 'user';
  users = [{id: Date.now(), email: email, username: username ,password: password, role: role }, ...users]
  return res.json({ success: true, users: users });

});

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

const checkUserToken = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({success: false, message: 'Header not found'});
  }

  const authorizationSplit = req.header('Authorization').split(' ');
  let token = authorizationSplit[1];
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, secret);
  } catch(error) {
    return res.status(401).json({success: false, message: error});
  }
  console.log('decodedToken', decodedToken);
  next();
};

api.post('/jobs',checkUserToken, (req, res) => {
  const job = req.body;
  addedJobs = [job, ...addedJobs];
  console.log('Nombre de jobs: ', getAllJobs().length);
  res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
  const term = req.params.term.toLowerCase().trim();
  let place = req.params.place;
  let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
  if (place) {
    place = place.toLowerCase().trim();
    jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
  }
  res.json({ sucess: true, jobs: jobs });
});

app.use('/api', api);
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
