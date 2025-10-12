import express from 'express';
import AuthRoute from './routes/AuthRoute.js';
import ResumeRoute from './routes/ResumeRoute.js'
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4441;

// IMPORTANT: Middleware MUST come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes come AFTER middleware
app.use('/api/auth', AuthRoute);
app.use('/api/response',ResumeRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});