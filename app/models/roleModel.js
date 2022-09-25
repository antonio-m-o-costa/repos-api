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
                _id: false,
                affects: {
                    type: String,
                    required: true,
                },
                permissions: [
                    {
                        _id: false,
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
                ],
            },
        ],
    },
    {
        collection: 'roles',
    }
);

var Role = mongoose.model('Role', RoleModelSchema);
module.exports = Role;
