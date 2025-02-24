import Hero from '@/components/features/Hero';
import TodoList from '@/components/features/todo/TodoList';
import { auth } from '@/server/auth';

export default async function Page() {
  const session = await auth();

  if (!session) return <Hero />;

  return (
    <div className="mx-auto max-w-md">
      <TodoList />
    </div>
  );
}
