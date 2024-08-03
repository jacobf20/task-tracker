import { Text, Card, RingProgress, Group, useMantineTheme, Progress } from '@mantine/core';
import classes from './TaskCard.module.css';

export function TaskCard({task}:any) {
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
          <CardWithSubTasks task={task} completed={completed} total={total} items={items} theme={theme} />
      ) : (
        <CardWithoutSubTasks task={task} theme={theme} />
      )}
    </div>
  );
}

function CardWithoutSubTasks({task, theme}:any) {
  const total = 100;
  let completed;
  let status;
  switch (task.status) {
    case "IN_PROGRESS":
      completed = 50;
      status = "In Progress";
      break;
    case "COMPLETED":
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
                  In Progress
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

function CardWithSubTasks({task, completed, total, items, theme}:any) {
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