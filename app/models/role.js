const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Role model
 */
const RoleModelSchema = new Schema(
    {
        scope: {
            type: String,
            required: true,
            index: true,
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
        actions: [
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
                            type: String,
                            required: true,
                        },
                    },
                    {
                        _id: false,
                    },
                ],
            },
            {
                _id: false,
            },
        ],
    },
    {
        collection: 'roles',
    }
);

var Role = mongoose.model('Role', RoleModelSchema);
module.exports = Role;
