# Status Sphere

Status Sphere is a modern status page system that allows organizations to communicate real-time service status and incidents to their users. It provides a simple yet powerful way to manage and display service health, incidents, and maintenance updates.

## Key Features

- 🔐 **Secure Authentication**: Powered by Auth0 for robust user authentication and authorization
- 📊 **Service Status Management**: Create and manage services with real-time status updates
- 🚨 **Incident Management**: Track and communicate incidents and maintenance events
- 📱 **Public Status Page**: Customizable public-facing status page for your users
- 🔄 **Real-time Updates**: Live status updates for all your services
- 📈 **Dashboard**: Comprehensive dashboard for monitoring service health
- 🎯 **Multi-service Support**: Manage multiple services and their dependencies

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Shadcn/ui** for UI components
- **React Query** for data fetching and caching
- **React Router** for routing
- **Auth0** for authentication
- **Axios** for API requests

### Backend

- **Node.js** with TypeScript
- **Express.js** for API server
- **MongoDB** for database
- **Mongoose** for ODM
- **JWT** for API authentication
- **Auth0** for user management

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Auth0 account
- Git

### Environment Variables

#### Frontend (.env)

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_URL=http://localhost:3000
```

#### Backend (.env)

```env
PORT=3000
MONGO_URI=your-mongodb-connection-string
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/yourusername/status-sphere.git
cd status-sphere
```

2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

3. Install Backend Dependencies

```bash
cd backend
npm install
```

4. Start MongoDB

```bash
# Make sure your MongoDB service is running
```

5. Start the Backend Server

```bash
cd backend
npm run dev
```

6. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

7. Access the application at `http://localhost:5173`

## Development

### Frontend Component Creation

Use the provided script to create new components:

```bash
cd frontend
npm run create-component ComponentName [subdirectory]
```

### API Documentation

The backend API provides the following main endpoints:

- `/api/public/*` - Public endpoints for status page
- `/api/services/*` - Service management endpoints
- `/api/incidents/*` - Incident management endpoints
- `/api/dashboard/*` - Dashboard data endpoints

All authenticated endpoints require a valid JWT token from Auth0.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
