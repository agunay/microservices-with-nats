import mongoose from 'mongoose';
import { NotFoundError } from '@agunay.tix/common';
import { app } from './app';

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Secret missing: JWT_KEY');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Secret missing: MONGO_URI');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

start();
