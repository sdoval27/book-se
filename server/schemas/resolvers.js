const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parents, args, context ) => {
      if (context.user){
        return User.findOne({_id: context.user.id}).populate('books');
      }
    }
  },
  Mutation:{
    login:
    addUser: async (parent, {}) => {
        return await User.create();
    },
    saveBook: async (parent, {id, savedBooks} ) => {
        return await User.findOneAndUpdate(
            {_id: id},
            { books },
            {new: true}
        );
    }
    removeBook: async (parent, {id, savedBooks}) => {
        return await User.findOneAndDelete(
            {_id: id},
            {savedBooks}
        )
    }
  }
};

module.exports = resolvers;
