// Create web server

// Import Express
const express = require('express');
const app = express();

// Import CORS
const cors = require('cors');
app.use(cors());

// Import Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import Mongoose
const mongoose = require('mongoose');

// Import Schema
const Comment = require('./models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

// Create a new comment
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err, comment) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(comment);
        }
    });
});

// Read all comments
app.get('/api/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(comments);
        }
    });
});

// Read one comment
app.get('/api/comments/:id', (req, res) => {
    Comment.find({_id: req.params.id}, (err, comment) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(comment);
        }
    });
});

// Update one comment
app.put('/api/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        comment: req.body.comment
    }, (err, comment) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(comment);
        }
    });
});

// Delete one comment
app.delete('/api/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(comment);
        }
    });
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});