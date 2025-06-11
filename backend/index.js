import express from 'express';
import tokenRouter from './routes/tokens.route.js';

const app = express();
const PORT = 8080;
app.use(express.json());

app.use('/api/tokens', tokenRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
