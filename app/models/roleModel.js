const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
                    trim: true,
                },
                permissions: [
                    {
                        _id: false,
                        get: {
                            type: String,
                            required: true,
                            trim: true,
                        },
                        post: {
                            type: Boolean,
                            required: true,
                        },
                        patch: {
                            type: String,
                            required: true,
                            trim: true,
                        },
                        delete: {
                            type: String,
                            required: true,
                            trim: true,
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

/**
 * @model Role model
 * ---
 * @param {String} scope role name
 * @param {Array} actions [affects, permissions]
 * @param {String} affects colection name
 * @param {Array} permissions [get, post, patch, delete]
 * @param {String} get all, self, none
 * @param {Bool} post true, false
 * @param {String} patch all, self, none
 * @param {String} delete all, self, none
 * ---
 * new document should be created for each scope (role)
 * when creating new collections an actions array should be pushed to each existing role document with appropriate permissions
 */
const Role = mongoose.model('Role', RoleModelSchema);
module.exports = Role;
