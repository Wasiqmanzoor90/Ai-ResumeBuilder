import express from 'express';
import AuthRoute from './routes/AuthRoute.js';

const app = express();

const PORT = process.env.PORT || 4441;

// IMPORTANT: Middleware MUST come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes come AFTER middleware
app.use('/api/auth', AuthRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});