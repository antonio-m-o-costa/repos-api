const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Repo model
 */
const RepoModelSchema = new Schema({
    _id: {
        type: Number,
        index: { unique: true },
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'title is too long'],
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        alt: {
            type: String,
            required: false,
        },
    },
    created: [
        {
            at: {
                type: Date,
                required: true,
                default: Date.now,
            },
            by: {
                type: Schema.Types.Number,
                ref: 'User',
                required: true,
            },
        },
    ],
    edited: [
        {
            at: {
                type: Date,
                required: false,
            },
            by: {
                type: Schema.Types.Number,
                ref: 'User',
                required: false,
            },
        },
    ],
    flagged: [
        {
            desc: {
                type: String,
                required: true,
            },
            at: {
                type: Date,
                required: false,
            },
            by: {
                type: Schema.Types.Number,
                ref: 'User',
                required: false,
            },
        },
    ],
    deleted: [
        {
            at: {
                type: Date,
                required: false,
            },
            by: {
                type: Schema.Types.Number,
                ref: 'User',
                required: false,
            },
        },
    ],
    collection: 'repos',
});

var Repo = mongoose.model('Repo', RepoModelSchema);
