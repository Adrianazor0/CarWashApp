import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Reserva, { IReservation } from './models/reservation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI as string;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.post('/api/reservations', async (req: Request, res: Response) => {
    try {
        const reservationData: IReservation = req.body;
        const newReservation = new Reserva(reservationData);
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});