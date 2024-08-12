'use client'

import { useEffect, useState } from "react";
import { Group, SegmentedControl, Select, Title } from "@mantine/core";
import { TaskCard } from "../tasks/TaskCard";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [range, setRange] = useState<string>('3 days');

  useEffect(() => {
    if (isLoading) {
      getTasks();
    }
  })

  const getTasks = () => {
    const options ={
        method: 'GET'
    }
    const url = "http://localhost:8080/tasks-dashboard?range=" + range.split('')[0];
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
          setTasks(res);
          setIsLoading(!isLoading);
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

  return <div>
    <Group justify="space-between">
      <Title order={1} mb="md">Due In {range.split('')[0]} Days</Title>
      <SegmentedControl 
        data={['1 day', '3 days', '5 days', '7 days']}
        defaultValue="3"
        value={range}
        onChange={(e) => {setRange(e); getTasks()}}
      />
    </Group>
    <Group justify="flex-start">
      {tasks.map((task, index) => <TaskCard key={index} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask}/>)}
    </Group>
  </div>;
}