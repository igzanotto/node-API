const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        title: String,
        description: String,
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema);

module.exports = Task