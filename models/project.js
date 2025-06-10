const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String, 
    required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  materials: Array
})

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project