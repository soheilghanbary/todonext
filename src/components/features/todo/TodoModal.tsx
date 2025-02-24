'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAddTodo } from '@/hooks/use-todos';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import TodoForm from './TodoForm';

const TriggerButton = (
  <Button className="w-full max-w-md">
    <PlusCircleIcon />
    Create Task
  </Button>
);

export default () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useAddTodo();

  const handleAddTodo = async (task: {
    id: string;
    title: string;
    completed: boolean;
  }) => {
    await mutateAsync(task);
  };

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <TodoForm
          isPending={isPending}
          onSubmit={handleAddTodo}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Task</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <TodoForm
            onSubmit={handleAddTodo}
            isPending={isPending}
            onClose={() => setOpen(false)}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
