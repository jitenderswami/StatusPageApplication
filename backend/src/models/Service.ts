export enum ServiceStatus {
    OPERATIONAL = 'operational',
    DEGRADED = 'degraded',
    PARTIAL_OUTAGE = 'partial_outage',
    MAJOR_OUTAGE = 'major_outage'
}

export interface Service {
    id: string;
    name: string;
    description?: string;
    status: ServiceStatus;
    userId: string;  // Owner of the service
    createdAt: Date;
    updatedAt: Date;
}

// MongoDB Schema
import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    description?: string;
    status: ServiceStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: Object.values(ServiceStatus),
        default: ServiceStatus.OPERATIONAL,
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

export const ServiceModel = mongoose.model<IService>('Service', ServiceSchema); 