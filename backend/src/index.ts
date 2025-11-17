import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend up & running');
});

// toate rutele pentru clienți: POST/GET/PUT
app.use('/client', clientRoutes);

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});