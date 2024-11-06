export type TTask = {
  id: number;
  category: string;
  title: string;
  status: string;
  description: string;
};

export type TTaskForm = Pick<TTask, 'category' | 'title' | 'description'>;
