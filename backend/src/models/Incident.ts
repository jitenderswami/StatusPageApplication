import mongoose, { Schema, Document } from 'mongoose';

export enum IncidentType {
    INCIDENT = 'incident',
    MAINTENANCE = 'maintenance'
}

export enum IncidentStatus {
    INVESTIGATING = 'investigating',
    IDENTIFIED = 'identified',
    MONITORING = 'monitoring',
    RESOLVED = 'resolved',
    SCHEDULED = 'scheduled',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export enum IncidentImpact {
    NONE = 'none',
    MINOR = 'minor',
    MAJOR = 'major',
    CRITICAL = 'critical'
}

export interface IIncident extends Document {
    title: string;
    type: IncidentType;
    status: IncidentStatus;
    impact: IncidentImpact;
    services: string[];  // Array of service IDs
    message: string;
    userId: string;
    startedAt: Date;
    resolvedAt?: Date;
    scheduledStartTime?: Date;  // For maintenance
    scheduledEndTime?: Date;    // For maintenance
    createdAt: Date;
    updatedAt: Date;
}

const IncidentSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: Object.values(IncidentType),
        required: true 
    },
    status: { 
        type: String, 
        enum: Object.values(IncidentStatus),
        required: true 
    },
    impact: { 
        type: String, 
        enum: Object.values(IncidentImpact),
        required: true 
    },
    services: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Service',
        required: true 
    }],
    message: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    startedAt: { 
        type: Date, 
        required: true 
    },
    resolvedAt: { 
        type: Date 
    },
    scheduledStartTime: { 
        type: Date 
    },
    scheduledEndTime: { 
        type: Date 
    }
}, {
    timestamps: true
});

export const IncidentModel = mongoose.model<IIncident>('Incident', IncidentSchema);

export interface Incident {
    id: string;
    title: string;
    type: IncidentType;
    status: IncidentStatus;
    impact: IncidentImpact;
    services: string[];
    message: string;
    userId: string;
    startedAt: Date;
    resolvedAt?: Date;
    scheduledStartTime?: Date;
    scheduledEndTime?: Date;
    createdAt: Date;
    updatedAt: Date;
} 