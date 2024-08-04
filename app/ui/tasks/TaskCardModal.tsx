import { Modal, Group, Text, Checkbox, Slider, Card, Center, Flex, Title, ModalTitle, Divider, Space, Button } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react";
import classes from './TaskCardModal.module.css'

export function TaskCardModal({cardModalOpened, toggle, task, theme, onUpdate, onDelete}:any) {
    
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
    }

    const onTaskChange = (val:any) => {
        task.status = convertPercentToStatus(val);
    }

    return (
        <div>
            <Modal opened={cardModalOpened} onClose={() => {toggle(); onUpdate(task);}} centered overlayProps={{backgroundOpacity: 0.55, blur: 3}} size="lg">
                <Card withBorder>
                    <Card.Section withBorder>
                        <Center>
                            <Title mt="md" mb="md">{task.taskName}</Title>
                        </Center>
                    </Card.Section>
                    <Card.Section withBorder={false} mt="md" mb="md" ml="xl" mr="xl">
                        {subTasks.length > 0 ? (
                            <div>
                            <Title mb="md" c={theme.colors.blue[3]} order={2}>Subtasks:</Title>
                            <Divider mb="md" />
                            {subTasks.map((subTask:any, index:any) => (
                            <div>
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
                                <Title mb="md" c={theme.colors.blue[3]}>Progress:</Title>
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
            </Modal>
        </div>
    );
}