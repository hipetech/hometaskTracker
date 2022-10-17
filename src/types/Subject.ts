import Task from "./Task";
import Color from "./Color";

type Subject = {
    _id: string,
    name: string,
    teachers: string[],
    tasks: Task[],
    colors: Color
}

export default Subject;