const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Repo model
 */
const RepoModelSchema = new Schema(
    {
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
                required: true,
            },
        },
        created: [
            {
                _id: false,
                at: {
                    type: Date,
                    required: true,
                    default: Date.now,
                },
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
            },
        ],
        edited: [
            {
                _id: false,
                at: {
                    type: Date,
                    required: true,
                },
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: 'unknown',
                    ref: 'User',
                    required: true,
                },
            },
        ],
        flagged: [
            {
                _id: false,
                desc: {
                    type: String,
                    required: true,
                },
                at: {
                    type: Date,
                    required: true,
                },
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
            },
        ],
        deleted: [
            {
                _id: false,
                at: {
                    type: Date,
                    required: true,
                },
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
            },
        ],
    },
    {
        collection: 'repos',
    }
);

var Repo = mongoose.model('Repo', RepoModelSchema);
module.exports = Repo;
