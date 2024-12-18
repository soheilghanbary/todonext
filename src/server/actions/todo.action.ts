'use server';
import type { Task } from '@prisma/client';
import { auth } from '../auth';
import { prisma } from '../db';

export async function getTodos() {
  const session = await auth();
  return await prisma.task.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTodo(data: AddTaskProps) {
  const session = await auth();
  return await prisma.task.create({
    data: {
      ...data,
      userId: session?.user.id!,
    },
  });
}

export async function deleteTodo(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}

export async function updateTodo(task: Pick<Task, 'id' | 'title'>) {
  return await prisma.task.update({
    where: { id: task.id },
    data: { title: task.title },
  });
}

export const doneTodos = async (id: string, completed: boolean) => {
  return await prisma.task.update({
    where: { id },
    data: { completed },
  });
};

export const clearTodos = async () => {
  const session = await auth();
  return await prisma.task.deleteMany({
    where: { userId: session?.user.id },
  });
};
