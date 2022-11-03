import Task from "./Task";
import Color from "./Color";

interface Subject {
    _id: string,
    name: string,
    teachers: string[],
    toDo: Task[],
    inProcess: Task[],
    complete: Task[],
    colors: Color
}

export default Subject;