import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { TTask, TTaskForm } from 'types/task';

const useTaskManagement = () => {
  const mockData = [
    {
      id: 1,
      category: 'Shopping',
      title: 'Shopping',
      status: 'pending',
      description: "Get essentials from Trader Joe's",
    },
    {
      id: 2,
      category: 'Shopping',
      title: 'Shoes',
      status: 'pending',
      description: 'Purchase running shoes',
    },
    {
      id: 3,
      category: 'Work',
      title: 'Presentation',
      status: 'completed',
      description: 'Create slides for team meeting',
    },
    {
      id: 4,
      category: 'Work',
      title: 'Review',
      status: 'pending',
      description: "Review frontend team's pull request",
    },
    {
      id: 5,
      category: 'Home',
      title: 'Garage',
      status: 'pending',
      description: 'Organize tools and discard unnecessary items',
    },
    {
      id: 6,
      category: 'Home',
      title: 'Plants',
      status: 'completed',
      description: 'Water indoor and outdoor plants',
    },
    {
      id: 7,
      category: 'Health',
      title: 'Exercise',
      status: 'pending',
      description: 'Complete 30-minute yoga session',
    },
    {
      id: 8,
      category: 'Health',
      title: 'Appointment',
      status: 'pending',
      description: 'Visit dentist for routine check-up',
    },
  ];

  const defaultState = {
    title: '',
    description: '',
    category: '',
  };

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [taskData, setTaskData] = useState<Array<TTask>>(mockData);
  const [originalTaskData, setOriginalTaskData] =
    useState<Array<TTask>>(mockData);
  const [newTask, setNewTask] = useState<TTaskForm>(defaultState);
  const [search, setSearch] = useState<string>('');

  const handleOpenModal = () => onOpen();

  const handleCloseModal = () => onClose();

  const handleDelete = (id: number) => {
    const newTaskData = taskData.filter((data) => data.id !== id);
    setTaskData(newTaskData);
    setOriginalTaskData(newTaskData);
  };

  const handleChangeInput = (value: string, type: string) => {
    setNewTask({
      ...newTask,
      [type]: value,
    });
  };

  const handleNewTask = () => {
    const newTaskData = [
      ...taskData,
      { ...newTask, id: taskData.length + 1, status: 'pending' },
    ];
    setTaskData(newTaskData);
    setOriginalTaskData(newTaskData);
    handleCloseModal();
  };

  const handleCancelNewTask = () => {
    handleCloseModal();
  };

  const handleComplete = (id: number) => {
    const newTaskData = taskData.map((data) => {
      if (data.id === id) {
        return { ...data, status: 'completed' };
      }
      return { ...data };
    });
    setTaskData(newTaskData);
    setOriginalTaskData(newTaskData);
  };

  const handleSearch = (value: string) => setSearch(value);

  const handleClickSearch = () => {
    const filteredTaskData = taskData.filter((data) =>
      data.category.toLowerCase().includes(search.toLowerCase())
    );
    setTaskData(filteredTaskData);
  };

  const handleCancelSearch = () => {
    setTaskData(originalTaskData);
  };

  return {
    taskData,
    isOpen,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
    handleNewTask,
    handleChangeInput,
    handleCancelNewTask,
    handleComplete,
    handleSearch,
    handleClickSearch,
    handleCancelSearch,
  };
};

export default useTaskManagement;
