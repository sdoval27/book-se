const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//context = auth.js
const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email, password });
            if (!user) {
                return new AuthenticationError("Incorrect email or password.");
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                return new AuthenticationError("Incorrect email or password.");
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return {token, user}
        },
        saveBook: async (parent, { bookData }, context) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );
        },
        removeBook: async (parent, { bookId }, context) => {
            return await User.findOneAndDelete(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            )
        }
    }
};

module.exports = resolvers;
