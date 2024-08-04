import { Modal, Button, TextInput, Group, ActionIcon, Text, Box, Divider, ModalTitle } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

export function AddTaskModal({taskModalOpened, toggle, submit}:any) {

    useEffect(() => {
        form.reset();
    }, [taskModalOpened])

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            taskName: '',
            dueDate: '',
            subTasks: []
        },
        validate: {
            taskName: (value) => (value.length > 0 ? null : 'Task Name Required')
        }
    });

    const subTaskFields = form.getValues().subTasks.map((item, index) => (
        <Group key={item} mt="xs">
            <TextInput 
                placeholder="Enter Sub-Task Name"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key(`subTasks.${index}`)}
                {...form.getInputProps(`subTasks.${index}`)}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('subTasks', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));


    return (
        <div>
            <Modal opened={taskModalOpened} onClose={toggle} title="Add New Task" centered overlayProps={{backgroundOpacity: 0.55, blur: 3}}>
                <form onSubmit={form.onSubmit((values) => {submit(values); toggle();})}>
                    <TextInput 
                        withAsterisk
                        label="Task Name"
                        placeholder="Enter Task Name"
                        key={form.key('taskName')}
                        {...form.getInputProps('taskName')}
                    />
                    <DateTimePicker
                        dropdownType="modal"
                        valueFormat="DD MMM YYYY hh:mm A"
                        label="Due Date"
                        placeholder="Pick Date & Time"
                        clearable
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
                            onClick={() => form.insertListItem('subTasks', '')}
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
            </Modal>
        </div>
    );
}