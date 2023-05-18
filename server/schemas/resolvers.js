const { User, Book } = require('../models');

const resolvers = {
  Query: {
    User: async () => {
      return await User.find({}).populate('classes').populate({
        path: 'classes',
        populate: 'book'
      });
    },
    Book: async () => {
      return await Class.find({}).populate('professor');
    },
    professors: async () => {
      // Populate the classes subdocument on every instance of Professor
      return await Professor.find({}).populate('classes');
    }
  },
  Mutation:{
    createUser: async (parent, args)
  }
};

module.exports = resolvers;
