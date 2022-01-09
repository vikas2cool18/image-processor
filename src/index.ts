import express from 'express';
import routes from './routes/index';

const app = express();

const port = 3000;

app.use('/api', routes);
app.use(express.static(__dirname + '/assets/thumb'));

app.listen(port, () => {
  console.log(`server started at localhost: ${port}`);
});

export default app;
