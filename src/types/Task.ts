import TaskStatus from "./TaskStatus";

type Task = {
    _id: string,
    name: string,
    status: TaskStatus,
    subject: string
}

export default Task;