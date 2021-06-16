const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://hoangtuan1106:hoangtuan1106@cluster0.m6xdn.mongodb.net/memory', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
