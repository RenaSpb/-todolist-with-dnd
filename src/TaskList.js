import React, {useEffect, useState} from 'react';
import './App.css'
import TaskItem from "./TaskItem";
import {Text, VStack} from "@chakra-ui/react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const TaskList = ({tasks, setTasks, onDeleteClick, handleToggle, handleEdit}) => {
    const [sortedTasks, setSortedTasks] = useState(tasks);

    useEffect(() => {
        setSortedTasks(tasks);
    }, [tasks]);

    const moveTask = (dragIndex, hoverIndex) => {
        const newSortedTasks = [...sortedTasks];
        const draggedTask = newSortedTasks[dragIndex];
        newSortedTasks.splice(dragIndex, 1);
        newSortedTasks.splice(hoverIndex, 0, draggedTask);
        setTasks(newSortedTasks);
        setSortedTasks(newSortedTasks);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <VStack>
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            index={index}
                            task={task}
                            onDeleteClick={onDeleteClick}
                            handleToggle={handleToggle}
                            handleEdit={handleEdit}
                            moveTask={moveTask}
                        />
                    ))
                ) : (
                    <Text color="gray.500">No tasks yet. Add one above!</Text>
                )}
            </VStack>
        </DndProvider>
    );
};

export default TaskList;