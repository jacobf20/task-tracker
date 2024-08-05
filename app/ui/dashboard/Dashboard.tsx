'use client'

import { useEffect, useState } from "react";
import { Group, Title } from "@mantine/core";
import { TaskCard } from "../tasks/TaskCard";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [range, setRange] = useState(5);

  useEffect(() => {
    if (isLoading) {
      getTasks();
    }
  })

  const getTasks = () => {
    const options ={
        method: 'GET'
    }
    const url = "http://localhost:8080/tasks-dashboard?range=" + '7';
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
          setTasks(res);
          setIsLoading(!isLoading);
      });
  }

  return <div>
    <Title order={1} mb="md">Due In {range} Days</Title>
    <Group justify="flex-start">
      {tasks.map((task) => <TaskCard key={task.id} task={task}/>)}
    </Group>
  </div>;
}