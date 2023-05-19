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
            const user = await User.findOne({ email });
            if (!user) {
                return new AuthenticationError("Incorrect credentials.");
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                return new AuthenticationError("Incorrect credentials.");
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            console.log(user)
            const token = signToken(user)

            return {token, user}
        },
        saveBook: async (parent, { input }, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true },
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeBook: async (parent, { bookId }, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            )
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in');
        }
    }
};

module.exports = resolvers;
