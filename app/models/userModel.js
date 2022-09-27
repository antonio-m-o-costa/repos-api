const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model User model
 */
const UserModelSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
            unique: [true, 'username already registered'],
            trim: true,
            minLength: [4, 'username is too short'],
            maxLength: [16, 'username is too long'],
            validate: {
                validator: function (us) {
                    /**
                     * - min 4 characters
                     * - max 16 characters
                     * - alphanumeric only
                     * - uppercase allowed
                     * - lowercase allowed
                     */
                    return /[a-zA-Z0-9]{4,16}/.test(us);
                },
                message: 'invalid username',
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: [8, 'password is too short'],
            maxLength: [128, 'password is too long'],
        },
        role: {
            type: String,
            required: false,
            default: 'user',
        },
        created: {
            type: Date,
            required: true,
            default: Date.now,
        },
        edited: [
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
        collection: 'users',
    }
);

const User = mongoose.model('User', UserModelSchema);
module.exports = User;
