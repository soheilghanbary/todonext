'use client';
import TodoDone from '@/components/features/todo/TodoDone';
import { cn, fromNow } from '@/lib/utils';
import type { Task } from '@prisma/client';
import TodoEdit from './TodoEdit';
import TodoRemove from './TodoRemove';

export default ({ id, title, completed, createdAt }: Task) => (
  <div className="rounded-md border bg-card p-2">
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={cn('flex w-fit cursor-pointer items-center gap-2 text-sm', {
          'text-muted-foreground line-through': completed,
        })}
      >
        <TodoDone id={id} completed={completed} />
        <p>{title}</p>
      </label>
      <div className="flex items-end justify-between gap-2">
        <p className="flex-1 text-[10px] text-muted-foreground">
          {fromNow(createdAt)}
        </p>
        <TodoEdit id={id} title={title} />
        <TodoRemove id={id} />
      </div>
    </div>
  </div>
);
