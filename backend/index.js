import express from 'express';
import tokenRouter from './routes/tokens.route.js';
import emergencyRouter from './routes/emergency.route.js';
import drugsRouter from './routes/drug.route.js';
import bloodRouter from './routes/blood.route.js';
import departmentRouter from './routes/department.route.js';
import scheduleRouter from './routes/schedule.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors({
  origin: 'https://centralized-patient-resource-manage.vercel.app/',
  credentials: true,
}));
app.use('/api/tokens', tokenRouter);
app.use('/api/alert', emergencyRouter);
app.use('/api/drugs', drugsRouter);
app.use('/api/blood', bloodRouter);
app.use('/api/department', departmentRouter);
app.use('/api/schedule', scheduleRouter);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
