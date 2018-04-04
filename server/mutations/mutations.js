const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql

const mongoose = require('mongoose')

const UserModel = mongoose.model('user')
const UserType = require('./../types/user_type')

const TagModel = mongoose.model('tag')
const TagType = require('./../types/tag_type')

const PostModel = mongoose.model('post')
const PostType = require('./../types/post_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return new UserModel(args).save()
      }
    },
    addTag: {
      type: TagType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return new TagModel(args).save()
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
        tags: {
          type: new GraphQLList(GraphQLID)
        },
        rating: {
          type: GraphQLInt
        },
        images: { type: new GraphQLList(GraphQLString) },
        user: {
          type: GraphQLID
        }
      },
      resolve(parentValue, args) {
        PostModel.plusTag(args.tags)
        return new PostModel(args).save()
      }
    },
    postUpVote: {
      type: PostType,
      args: {
        post: {
          type: GraphQLID
        }
        // user: {
        //  type:
        // }
      },
      resolve(parentValue, args) {
        return PostModel.upVote(args)
      }
    },
    postDownVote: {
      type: PostType,
      args: {
        post: {
          type: GraphQLID
        }
        // user: {
        //  type:
        // }
      },
      resolve(parentValue, args) {
        return PostModel.downVote(args)
      }
    },
    login: {
      type: UserType,
      args: {
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return UserModel.findOne({ username: args.username }, function(
          err,
          user
        ) {
          if (err) throw err

          // test a matching password
          // const check = user.comparePassword(args.password, function(
          //   err,
          //   isMatch
          // ) {
          //   if (err) throw err
          //   console.log('Password:', isMatch) // -> Password123: true
          // })
        })
      }
    }
  }
})

module.exports = mutation
