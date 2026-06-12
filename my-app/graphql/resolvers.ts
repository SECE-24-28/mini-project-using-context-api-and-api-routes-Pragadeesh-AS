import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    // Fetch all tasks ordered by creation date
    tasks: () => prisma.task.findMany({ orderBy: { createdAt: "desc" } }),
    task: (_: unknown, { id }: { id: number }) =>
      prisma.task.findUnique({ where: { id } }),
  },

  Mutation: {
    createTask: (
      _: unknown,
      args: { title: string; description?: string; priority?: boolean }
    ) =>
      prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          priority: args.priority ?? false,
        },
      }),

    updateTask: (
      _: unknown,
      args: { id: number; title?: string; description?: string; priority?: boolean }
    ) =>
      prisma.task.update({
        where: { id: args.id },
        data: {
          ...(args.title !== undefined && { title: args.title }),
          ...(args.description !== undefined && { description: args.description }),
          ...(args.priority !== undefined && { priority: args.priority }),
        },
      }),

    deleteTask: (_: unknown, { id }: { id: number }) =>
      prisma.task.delete({ where: { id } }),

    // Toggle the completed status of a task
    toggleTaskCompletion: async (_: unknown, { id }: { id: number }) => {
      const task = await prisma.task.findUniqueOrThrow({ where: { id } });
      return prisma.task.update({
        where: { id },
        data: { completed: !task.completed },
      });
    },
  },
};
