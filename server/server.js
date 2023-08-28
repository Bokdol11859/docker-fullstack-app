

const express = require('express')
const db = require('./db');

const app = express();

app.use(express.json());
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})

app.get('/api/values', (req, res) => {
    db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
        if(err) return res.status(500).send(err);
        else return res.json(results);
    })
})

app.post('/api/value', (req, res, next) => {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
        if(err) return res.status(500).send(err);
        else return res.json({success: true, value: req.body.value});
    })
})