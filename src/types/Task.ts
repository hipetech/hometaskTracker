import TaskStatus from "./TaskStatus";

type Task = {
    _id: string,
    name: string,
    status: TaskStatus
}

export default Task;