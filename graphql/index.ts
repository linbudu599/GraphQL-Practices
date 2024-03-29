import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";
import {
  readAll,
  createOne,
  updateOne,
  deleteOne,
  findOne
} from "../controllers/list";

import { UserType } from "./types";
import { UserInput, FindBy, NewInfo } from "./types/input";

export const RootQuery = new GraphQLObjectType({
  name: "root",
  description: "Root Query",
  fields: {
    getByParams: {
      type: new GraphQLList(UserType),
      args: {
        genderAndAge: {
          type: new GraphQLNonNull(UserInput)
        }
      },
      resolve: async (parentValue, { genderAndAge }) => {
        return findOne(genderAndAge);
      }
    },
    getAll: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return readAll();
      }
    }
  }
});

export const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation",
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        return createOne(name, age);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        findBy: {
          type: new GraphQLNonNull(FindBy)
        },
        newInfo: {
          type: new GraphQLNonNull(NewInfo)
        }
      },
      resolve: async (parentValue, { findBy, newInfo }) => {
        return updateOne(findBy, newInfo);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        return deleteOne(name, age);
      }
    }
  })
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
