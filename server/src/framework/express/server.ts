import express from 'express';
import router from './routes/router';
import cors from 'cors';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://chat-gpt-clone-zeta-weld.vercel.app/'
];

app.use(cors({
    origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use("/" ,router)

export default app;
