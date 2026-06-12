export const typeDefs = `#graphql
  type Task {
    id: Int!
    title: String!
    description: String
    completed: Boolean!
    priority: Boolean!
    createdAt: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, priority: Boolean): Task!
    updateTask(id: Int!, title: String, description: String, priority: Boolean): Task!
    deleteTask(id: Int!): Task!
    toggleTaskCompletion(id: Int!): Task!
  }
`;
