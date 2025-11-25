import mongoose, {Schema, Document} from "mongoose";

export interface IReservation extends Document {
    customerName: string;
    color: string;
    brand: string;
    vehicleModel: string;
    vehicleType: 'SUV' | 'PickupTruck' | 'Car' | 'Bus';
    licensePlate?: string;
}

const ReservationSchema: Schema = new Schema({
    customerName: {type: String, required: true},
    color: {type: String, required: true},
    brand: {type: String, required: true},
    vehicleModel: {type: String, required: true},
    vehicleType: {
        type: String, 
        required: true, 
        enum: [
            'SUV', 'PickupTruck', 'Car', 'Bus'
        ]
    },
    licensePlate: {type: String, required: false} 
}, { 
    timestamps: true     
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);