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
            maxLength: [32, 'password is too long'],
            validate: {
                validator: function (pw) {
                    /**
                     * - min 8 characters
                     * - max 32 characters
                     * - min 1 uppercase letter
                     * - min 1 lowercase letter
                     * - min 1 number
                     * - can contain special characters
                     */
                    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/.test(
                        pw
                    );
                },
                message: 'invalid password',
            },
        },
        email: {
            type: String,
            required: false,
            maxLength: [128, 'email is too long'],
            index: true,
            unique: [true, 'email already registered'],
            validate: {
                validator: function (ml) {
                    /**
                     * - max length 128 characters
                     * - based on crf2822 standards
                     * - https://www.rfc-editor.org/rfc/rfc2822.txt
                     */
                    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                        ml
                    );
                },
                message: 'invalid email',
            },
        },
        avatar: {
            type: String,
            required: false,
            default: 'default.png',
        },
        created: {
            type: Date,
            required: true,
            default: Date.now,
        },
        verified: {
            type: Date,
            required: false,
        },
        role: {
            type: String,
            required: false,
            default: 'user',
        },
        edited: [
            {
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
            {
                _id: false,
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
                    required: true,
                },
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
            },
            {
                _id: false,
            },
        ],
        deleted: [
            {
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
            {
                _id: false,
            },
        ],
    },
    {
        collection: 'users',
    }
);

const User = mongoose.model('User', UserModelSchema);
module.exports = User;
