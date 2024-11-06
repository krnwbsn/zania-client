import { memo } from 'react';
import useTaskManagement from './TaskManagement.action';
import Layout from 'components/Layout';
import {
  Heading,
  HStack,
  Box,
  Text,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import Modal from 'components/Modal';

const TaskManagement = () => {
  const {
    taskData,
    isOpen,
    handleNewTask,
    handleCloseModal,
    handleOpenModal,
    handleDelete,
    handleChangeInput,
    handleCancelNewTask,
    handleComplete,
    handleSearch,
    handleClickSearch,
    handleCancelSearch,
  } = useTaskManagement();

  return (
    <Layout>
      <HStack gap={4} my={4}>
        <Button onClick={handleOpenModal}>Add Task</Button>
        <Input
          placeholder="Search by category"
          onChange={(e) => handleSearch(e.target.value)}
          flex={1}
        />
        <Button onClick={handleClickSearch}>Search</Button>
        <Button onClick={handleCancelSearch}>Cancel</Button>
      </HStack>
      <VStack align="stretch" gap={4}>
        {taskData.map((data, i) => {
          const isDone = data.status === 'completed';
          return (
            <HStack
              key={i}
              border="1px solid gray"
              borderRadius="md"
              p={4}
              {...(isDone && {
                bg: 'green',
                color: 'white',
              })}
            >
              <Box flex={1}>
                <Heading as="h3" fontSize={14}>
                  {data.title}
                </Heading>
                <Text as="p" fontSize={14}>
                  {data.description}
                </Text>
              </Box>
              {!isDone && (
                <Button onClick={() => handleComplete(data.id)}>Done</Button>
              )}
              <Button onClick={() => handleDelete(data.id)}>Delete</Button>
            </HStack>
          );
        })}
      </VStack>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <VStack gap={2} p={4}>
          <Heading as="h1" fontSize={16}>
            Add New Task
          </Heading>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              onChange={(e) => handleChangeInput(e.target.value, 'title')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              onChange={(e) => handleChangeInput(e.target.value, 'description')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              placeholder="Category"
              onChange={(e) => handleChangeInput(e.target.value, 'category')}
            />
          </FormControl>
          <HStack>
            <Button onClick={handleNewTask}>Add</Button>
            <Button onClick={handleCancelNewTask}>Cancel</Button>
          </HStack>
        </VStack>
      </Modal>
    </Layout>
  );
};

export default memo(TaskManagement);
