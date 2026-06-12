import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      priority
      createdAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      title
      description
      completed
      priority
      createdAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $priority: Boolean) {
    createTask(title: $title, description: $description, priority: $priority) {
      id
      title
      description
      completed
      priority
      createdAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String, $description: String, $priority: Boolean) {
    updateTask(id: $id, title: $title, description: $description, priority: $priority) {
      id
      title
      description
      completed
      priority
      createdAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const TOGGLE_TASK_COMPLETION = gql`
  mutation ToggleTaskCompletion($id: Int!) {
    toggleTaskCompletion(id: $id) {
      id
      completed
    }
  }
`;
