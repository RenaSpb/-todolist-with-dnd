import React from 'react';
import {Flex, Text, Checkbox, Box, IconButton} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useDrag, useDrop} from "react-dnd";


const itemTypes = {
    TASK: "task"
}
const TaskItem = ({ task, index, onDeleteClick, handleToggle, handleEdit, moveTask}) => {

    const [{isDragging}, drag] = useDrag({
        type: itemTypes.TASK,
        item: {type: itemTypes.TASK, index},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: itemTypes.TASK,
        hover(item) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex===hoverIndex) {
                return
            }
            moveTask(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    return (
        <Box
            ref={(node) => drag(drop(node))}
            opacity={isDragging ? 0.5 : 1}
            style={{cursor: "move", width: '110%'}}
            display='flex'
        >
        <Flex align="center" justify="space-between" width="100%" className="task-item">
            <Checkbox
                isChecked={task.completed}
                onChange={() => handleToggle(task.id)}
                      ml={4}
                      size='md'
                      colorScheme="teal"
                      borderColor="gray.500"
                >
            </Checkbox>
            <Box borderBottom="2px solid gray"
                 width='50vh'
                 p="1"
                 ml={2}
                 >
                <Text fontSize='large'
                      textDecoration={task.completed ? 'line-through' : 'none'}
                >
                    {task.text}
                </Text>
            </Box>

            <IconButton
                ml={2} p={3}
                colorScheme="teal"
                aria-label="Edit task"
                icon={<EditIcon />}
                onClick={() => handleEdit(task.id)}
            />
            <IconButton
                ml={2} p={3}
                colorScheme="blackAlpha"
                aria-label="Delete task"
                icon={<DeleteIcon />}
                onClick={() => onDeleteClick(task.id)}

            />

        </Flex>
        </Box>
    );
};

export default TaskItem;
