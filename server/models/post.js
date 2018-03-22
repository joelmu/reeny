const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
      required: true
    }
  ],
  rating: {
    type: Number,
    required : true,
    default: 0,
    min: 0,
    max: 5
  },
  images: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

PostSchema.statics.plusTag = function(tags) {
  const TagModel = mongoose.model('tag')
  return TagModel.findById({ _id: tags }).then(tag => {
    tag.count++
    return tag.save()
  })
}

mongoose.model('post', PostSchema)

module.exports = PostSchema
