import { AddTodo } from '@/components/add-todo';
import { Hero } from '@/components/hero';
import { TodoList } from '@/components/todo-list';
import { auth } from '@/server/auth';

export default async function Page() {
  const session = await auth();

  if (!session) return <Hero />;

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-center font-black text-2xl lg:text-3xl">
        Add Todo
      </h1>
      <div className="grid gap-4">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
