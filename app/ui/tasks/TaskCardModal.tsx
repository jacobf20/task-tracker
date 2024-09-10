import { Modal, Group, Text, Slider, Card, Center, Title, ModalTitle, Divider, Space, Button, TextInput, Box, ActionIcon, Indicator } from "@mantine/core"
import { IconTrash, IconCalendar, IconChecklist, IconCirclePlus, IconSubtask, IconPencil, IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerProps, DateTimePicker } from "@mantine/dates";
import classes from './TaskCardModal.module.css'
import { useEffect, useState } from "react";

export function TaskCardModal({cardModalOpened, toggle, task, theme, onUpdate, onDelete}:any) {
    
    const [isEditing, setIsEditing] = useState(false);
    
    const dueDate = new Date(task.dueDate).toLocaleString();

    useEffect(() => {
        setIsEditing(false);
    }, [cardModalOpened])

    useEffect(() => {
        form.reset();
    }, [isEditing])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            taskName: task.taskName,
            dueDate: new Date(task.dueDate),
            subTasks: task.subTasks
        },
        validate: {
            taskName: (value) => (value.length > 0 ? null : 'Task Name Required'),
            dueDate: (value) => (value ? null : 'Due Date Required')
        }
    });

    const subTaskFields = form.getValues().subTasks.map((item:any, index:any) => (
        <Group key={item} mt="xs">
            <TextInput 
                leftSection={<IconSubtask />}
                placeholder="Enter Sub-Task Name"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key(`subTasks.${index}.subTaskName`)}
                {...form.getInputProps(`subTasks.${index}.subTaskName`)}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('subTasks', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    const today = new Date();

    const dayRenderer: DatePickerProps['renderDay'] = (date) => {
        const shouldIndicate = date.getDate() === today.getDate() 
        && date.getMonth() === today.getMonth()
        && date.getFullYear() === today.getFullYear();
        return (
            <Indicator size={4} color={theme.colors.blue[3]} position="top-center" disabled={!shouldIndicate}>
                <div>{date.getDate()}</div>
            </Indicator>
        );
    }

    const subTasks = task.subTasks;

    const marks = [
        { value: 0, label: <Text mt="xs" mb="md" size="sm">Not Started</Text> },
        { value: 50, label: <Text mt="xs" mb="md" size="sm">In Progress</Text> },
        { value: 100, label: <Text mt="xs" mb="md" size="sm">Complete</Text> }
    ];

    const convertStatusToPercent = (status:any) => {
        switch(status) {
            case "IN_PROGRESS":
                return 50;
            case "COMPLETE":
                return 100;
            default:
                return 0;
        }
    }

    const convertPercentToStatus = (val:any) => {
        switch(val) {
            case 50:
                return "IN_PROGRESS";
            case 100:
                return "COMPLETE";
            default:
                return "NEW";
        }
    }

    const onSubTaskChange = (index:any, val:any) => {
        task.subTasks[index].status = convertPercentToStatus(val);
        let inProgressCount = 0;
        let completeCount = 0;
        task.subTasks.map((subTask:any) => {
            if (subTask.status === "IN_PROGRESS") {
                inProgressCount += 1;
            } else if (subTask.status === "COMPLETE") {
                completeCount += 1;
            }
        })
        task.inProgressSubTasks = inProgressCount;
        task.completedSubTasks = completeCount;
    }

    const onTaskChange = (val:any) => {
        task.status = convertPercentToStatus(val);
    }

    const onTaskEdit = (values:any) => {
        task.taskName = values.taskName;
        task.subTasks = values.subTasks;
        task.dueDate = values.dueDate;
    }

    return (
        <div>
            <Modal opened={cardModalOpened} onClose={() => {toggle(); onUpdate(task);}} centered overlayProps={{backgroundOpacity: 0.55, blur: 3}} size="lg">
                {!isEditing ? (
                <div>
                    <Card withBorder>
                        <Card.Section withBorder>
                            <Group justify="space-between">
                                <Title ml="md" mt="md" mb="md">{task.taskName}</Title>
                                <Button mr="md" leftSection={<IconPencil />} onClick={() => setIsEditing(true)}>Edit</Button>
                            </Group>
                            <Title ml="md" mb="md" order={4} c="dimmed">Due {dueDate}</Title>
                        </Card.Section>
                        <Card.Section withBorder={false} mt="md" mb="md" ml="xl" mr="xl">
                            {subTasks.length > 0 ? (
                                <div>
                                <Title mb="md" order={2}>Subtasks:</Title>
                                <Divider mb="md" />
                                {subTasks.map((subTask:any, index:any) => (
                                <div key={index}>
                                    <Title order={4} mb="md">{subTask.subTaskName}</Title>
                                    <Slider
                                        defaultValue={convertStatusToPercent(subTask.status)}
                                        step={50}
                                        marks={marks}
                                        label={null}
                                        mt="sm"
                                        mb="lg"
                                        color={theme.colors.blue[3]}
                                        onChange={(event) => {onSubTaskChange(index, event)}}
                                    />
                                    <Space h="xl" />
                                    <Divider mb="md" />
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div>
                                <Title mb="md" order={2}>Progress:</Title>
                                <Divider mb="md" />
                                <Slider 
                                    defaultValue={convertStatusToPercent(task.status)}
                                    step={50}
                                    marks={marks}
                                    label={null}
                                    mt="sm"
                                    mb="lg"
                                    color={theme.colors.blue[3]}
                                    onChange={(event) => onTaskChange(event)}
                                />
                            </div>
                            )}
                        </Card.Section>
                    </Card>
                    <Group justify="flex-end">
                        <Button variant="outline" color={theme.colors.red[6]} mt="md" mb="md" onClick={() => onDelete(task)}>
                            <Group justify="space-between">
                                <Title order={4} mt="sm" mb="sm">Delete</Title>
                                <IconTrash />
                            </Group>
                        </Button>
                    </Group>
                </div>
                ) : (
                <form onSubmit={form.onSubmit((values) => {onTaskEdit(values); onUpdate(task); toggle();})}>
                    <Group justify="flex-end">
                        <Button leftSection={<IconArrowLeft />} onClick={() => setIsEditing(false)}>Back</Button>
                    </Group>
                    <TextInput 
                        leftSection={<IconChecklist />}
                        withAsterisk
                        label="Task Name"
                        placeholder="Enter Task Name"
                        key={form.key('taskName')}
                        {...form.getInputProps('taskName')}
                    />
                    <DateTimePicker
                        leftSection={<IconCalendar />}
                        withAsterisk
                        dropdownType="modal"
                        valueFormat="DD MMM YYYY hh:mm A"
                        label="Due Date"
                        placeholder="Pick Date & Time"
                        clearable
                        renderDay={dayRenderer}
                        key={form.key('dueDate')}
                        {...form.getInputProps('dueDate')}
                    />

                    <Divider my="md" />

                    <Group justify="space-between" mt="md">
                        <ModalTitle ta="left">
                            Add Subtasks
                        </ModalTitle>
                        <ActionIcon 
                            variant="light" 
                            aria-label="Adds" 
                            size="lg"
                            onClick={() => form.insertListItem('subTasks', {subTaskName: '', status: 'NEW'})}
                        >
                            <IconCirclePlus size="1rem"/>
                        </ActionIcon>
                    </Group>
                    <Box maw={500} mx="auto">
                        {subTaskFields.length > 0 ? (
                            <Group mb="xs">
                                <Text fw={500} size="sm" style={{ flex: 1 }}>
                                    Name
                                </Text>
                            </Group>
                        ) : (
                            <Text c="dimmed" ta="center">
                                No Sub-Tasks...
                            </Text>
                        )}

                        {subTaskFields}
                    </Box>

                    <Divider my="md" />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
                )}
            </Modal>
        </div>
    );
}