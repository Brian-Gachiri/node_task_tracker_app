const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Please enter a title"]
        },
        description: {
            type: String,
            required: false
        },
        status: {
            type: Boolean,
            required: false
        },
        priority: {
           type: String,
           required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Todo', todoSchema);