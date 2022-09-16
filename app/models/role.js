const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Role model
 */
const RoleModelSchema = new Schema({
    _id: {
        type: Number,
        index: { unique: true },
    },
    scope: {
        type: String,
        required: true,
        unique: [true, 'scope already registered'],
        trim: true,
        validate: {
            validator: function (sp) {
                /**
                 * - lowercase only
                 */
                return /[a-z]/.test(sp);
            },
            message: 'invalid scope',
        },
    },
    collection: [
        {
            affects: {
                type: String,
                required: true,
            },
            permissions: [
                {
                    get: {
                        type: String,
                        required: true,
                    },
                    post: {
                        type: Boolean,
                        required: true,
                    },
                    patch: {
                        type: String,
                        required: true,
                    },
                    delete: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
        },
    ],
    collection: 'roles',
});

var Role = mongoose.model('Role', RoleModelSchema);
