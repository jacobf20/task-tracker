import { Text, Card, RingProgress, Group, useMantineTheme, Progress, Space } from '@mantine/core';
import classes from './TaskCard.module.css';
import { TaskCardModal } from './TaskCardModal';
import { useState } from 'react';
import Link from 'next/link';

export function TaskCard({task, onUpdate, onDelete}:any) {
  const [cardModalOpened, setCardModalOpened] = useState(false);

  const stats = [
    { value: task.subTasks.filter((s:any) => s.status === "NEW").length, label: 'Remaining' },
    { value: task.subTasks.filter((s:any) => s.status === "IN_PROGRESS").length, label: 'In progress' },
  ];
  const theme = useMantineTheme();
  const completed = task.subTasks?.filter((s:any) => s.status === "COMPLETE").length;
  const total = task.subTasks?.length;
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <div>
      {task.subTasks.length > 0 ? (
        <Link className={classes.mainLink} href="javascript:void(0)" onClick={() => setCardModalOpened(!cardModalOpened)}>
          <CardWithSubTasks task={task} completed={completed} total={total} items={items} theme={theme} stats={stats}/>
        </Link>
      ) : (
        <Link className={classes.mainLink} href="javascript:void(0)" onClick={() => setCardModalOpened(!cardModalOpened)}>
          <CardWithoutSubTasks task={task} theme={theme} />
        </Link>
      )}
      <TaskCardModal cardModalOpened={cardModalOpened} toggle={() => setCardModalOpened(!cardModalOpened)} task={task} theme={theme} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

function CardWithoutSubTasks({task, theme}:any) {
  const dueDate = new Date(task.dueDate).toDateString();
  const total = 100;
  let completed;
  let status;
  switch (task.status) {
    case "IN_PROGRESS":
      completed = 50;
      status = "In Progress";
      break;
    case "COMPLETE":
      completed = 100;
      status = "Completed";
      break;
    default:
      completed = 0;
      status = "New";
      break;
  }
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {task.taskName}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {status}
            </Text>
            <Text fz="xs" c="dimmed">
              Status
            </Text>
            <Space h={52} />
            <Text className={classes.label} mt={30}>{dueDate}</Text>
            <Text fz="xs" c="dimmed">
              Due Date
            </Text>
          </div>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((completed / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Complete
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

function CardWithSubTasks({task, completed, total, items, theme, stats}:any) {
  const dueDate = new Date(task.dueDate).toDateString();
  const inProgress = stats[1].value;

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {task.taskName}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {completed}
            </Text>
            <Text fz="xs" c="dimmed">
              Completed
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
          <Text className={classes.label} mt={30}>{dueDate}</Text>
            <Text fz="xs" c="dimmed">
              Due Date
            </Text>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: ((completed + inProgress * 0.5) / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {(((completed + inProgress * 0.5) / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  )
}