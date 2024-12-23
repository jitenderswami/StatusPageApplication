import mongoose, { Schema, Document } from 'mongoose';
import { IncidentStatus } from './Incident';

export interface IIncidentUpdate extends Document {
    incidentId: string;
    message: string;
    status: IncidentStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const IncidentUpdateSchema = new Schema({
    incidentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Incident',
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: Object.values(IncidentStatus),
        required: true
    },
    userId: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

export const IncidentUpdateModel = mongoose.model<IIncidentUpdate>('IncidentUpdate', IncidentUpdateSchema);

export interface IncidentUpdate {
    id: string;
    incidentId: string;
    message: string;
    status: IncidentStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
} 