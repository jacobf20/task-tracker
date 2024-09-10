"use client";
import { Title, Group, Button, Menu, useMantineTheme, rem, LoadingOverlay } from "@mantine/core";
import { TaskCard } from "../../tasks/TaskCard";
import { AddTaskModal } from "../../tasks/AddTaskModal";
import { IconCirclePlus, IconChevronDown, IconCheckbox, IconSection } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function Class({className}:{className:string}) {
    const [taskModalOpened, setTaskModalOpened] = useState(false);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect (() => {
        setTitle(decodeURIComponent(className));

        if (isLoading) {
            getTasks();
        }
    });

    const getTasks = () => {
        const options ={
            method: 'GET'
        }
        const url = "http://localhost:8080/tasks?classId=" + className;
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                setTasks(res);
                setIsLoading(!isLoading);
            });
    }

    const handleSubmit = (values: any) => {
        const url = "http://localhost:8080/task"
        let formData = new FormData();
        formData.append("classId", decodeURIComponent(className));
        formData.append("taskName", values.taskName);
        formData.append("dueDate", values.dueDate);
        formData.append("subTasks", values.subTasks);
        const options = {
            method: 'POST',
            body: formData
        }
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    getTasks();
                }
            });
    }

    const handleDeleteTask = (task:any) => {
        const url = "http://localhost:8080/task?id=" + task.id;
        const options = {
            method: 'DELETE'
        }
        fetch(url, options)
            .then(() => getTasks());
    }

    const handleUpdateTask = (task:any) => {
        const url = "http://localhost:8080/task";
        let formData = new Blob([JSON.stringify(task)]);
        const options = {
            method: 'PUT',
            headers: {
                "content-type": 'application/json'
            },
            body: formData
        }
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if (res) {
                    getTasks();
                }
            })
    }

    return (
        <div>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group justify="space-between" pb="xl">
                <Title pb="lg">{title}</Title>
                <AddTaskButton modalOpened={taskModalOpened} toggle={setTaskModalOpened}/>
            </Group>
            <Title order={2} pb="md">New or In Progress:</Title>
            <Group justify="flex-start" pb="xl">
                {tasks.filter((task:any) => (task.subTasks.length === 0 && task.status != "COMPLETE") || task.completedSubTasks != task.subTasks.length).map((task, index) => <TaskCard key={index} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask}/>)}
            </Group>
            <Title order={2} pb="md">Complete:</Title>
            <Group justify="flex-start">
                {tasks.filter((task:any) => task.status === "COMPLETE" || (task.subTasks.length > 0 && task.completedSubTasks === task.subTasks.length)).map((task, index) => <TaskCard key={index} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask}/>)}
            </Group>
            <AddTaskModal taskModalOpened={taskModalOpened} toggle={setTaskModalOpened} submit={handleSubmit}/>
        </div>
    );
}

function AddTaskButton({modalOpened, toggle}:any) {
    const theme = useMantineTheme();

    return (
        <Menu
            transitionProps={{ transition: 'pop-bottom-left' }}
            position="bottom"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <Button
                    rightSection={<IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    pr={12}
                >
                    Add New
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconCheckbox style={{ width: rem(16), height: rem(16) }} color={theme.colors.green[6]} stroke={1.5} />}
                    rightSection={<IconCirclePlus style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[4]} stroke={1.5} />}
                    onClick={() => toggle(!modalOpened)}
                >
                    Task
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconSection style={{ width: rem(16), height: rem(16) }} color={theme.colors.grape[6]} stroke={1.5} />}
                    rightSection={<IconCirclePlus style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[4]} stroke={1.5} />}
                >
                    Section
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}