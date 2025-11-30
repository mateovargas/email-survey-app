import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.get('/greeting', (req, res) => {
    res.send({ hello: 'there' });
});

const PORT = process.env.PORT || 1000;

app.listen(PORT);