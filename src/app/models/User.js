const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        accessToken: { type: String, required: false },
        videos: { type: Array, required: false},
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
