import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import documentsRoutes from './routes/documentsRoutes';
import kycRoutes from './routes/kycRoutes';
import path from 'path'; 
import amlRoutes from './routes/amlRoutes';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/documents', express.static(path.join(__dirname, '../../public/documents')));

app.get('/', (req, res) => {
  res.send('Backend up & running');
});

// toate rutele pentru clienți: POST/GET/PUT
app.use('/client', clientRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/kyc', kycRoutes);
app.use('/aml', amlRoutes);

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});