import React, { useState } from "react";
import './App.css';
import {Button, ChakraProvider, Container, Flex, Heading, Input} from '@chakra-ui/react'
import TaskList from "./TaskList";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), text: 'Grocery', completed: false },
    { id: uuidv4(), text: 'Walking outside', completed: false },
    { id: uuidv4(), text: 'Some work', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter')  handleAddTask();
  }
  const handleAddTask = () => {
    if(editingTaskId !== null) {
      setTasks((prevTasks) =>
          prevTasks.map(task =>
              task.id === editingTaskId ? {...task, text: newTaskText} : task
          )
      );

      setNewTaskText('')
      setEditingTaskId(null)

    } else if(newTaskText.trim() !== '') {
      const newTask = {id:uuidv4() , text:newTaskText, completed: false}
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText('')
      }

  }

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggle = (taskId) => {
    setTasks((prevTasks) => prevTasks.map(task =>
    task.id === taskId ? {...task, completed: !task.completed} : task
        )
    )
  }

  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find(task => task.id === taskId);
      setNewTaskText(taskToEdit.text);
  };

  return (
  <ChakraProvider>
    <Container  maxW='md'>

      <Heading mb={4}
               color={'slategray'}
               align="center"
               marginTop={6}
               fontFamily="Inter"
               fontSize="2xl"
      >
        ToDo list
      </Heading>
  <Flex align="center" mb={4} >
      <Input  placeholder='Enter a new task'
              focusBorderColor='gray.500'
              className={editingTaskId !== null ? "editing" : ""}
              size='md'
              bg='white'
              mb={4}
              value={newTaskText}
              onChange={event => setNewTaskText(event.target.value)}
              onKeyDown={handleKeyDown}
               />
      <Button
          colorScheme='yellow'
          variant='solid'
          mb={4}
          ml={2}
          size='md'
          onClick={handleAddTask}
      >
          {editingTaskId !== null? 'Submit':'Add Task'}
      </Button>
  </Flex>


      <TaskList
          tasks={tasks}
          setTasks={setTasks}
          onDeleteClick={handleDeleteTask}
          handleToggle={handleToggle}
          handleEdit={handleEdit}
      />


    </Container>

  </ChakraProvider>
  );
}

export default App;
