import Subject from "../types/Subject";
import TaskStatus from "../types/TaskStatus";
import Color from "../types/Color";

export default class SubjectService {
    url: string;

    constructor() {
        this.url = "test url";
    }

    public getSubjects(): Promise<Subject[]> {
        const subjects: Subject[] = [
            {
                id: "WedDevelopment",
                name: "Web development",
                teachers: ["John Wick", "Sam Whilson"],
                tasks: [{id: "task1", name: "Task 1", status: TaskStatus.toDo}],
                colors: {fontColor: "#9B2E2E", backgroundColor: "#EEDBDB"}
            },
            {
                id: "DevOps",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#157760", backgroundColor: "#8DDECA"}
            },
            {
                id: "DevOps1",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#9B2E2E", backgroundColor: "#EEDBDB"}
            },
            {
                id: "DevOps2",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#05658E", backgroundColor: "#99D4EE"}
            },
            {
                id: "DevOps3",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#4F4FB9", backgroundColor: "#DBDBEE"}
            },
            {
                id: "DevOps4",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#000000", backgroundColor: "#F0F0F0"}
            },
            {
                id: "DevOps5",
                name: "Development & Operations",
                teachers: ["John Woo"],
                tasks: [
                    {id: "task1", name: "Task 1", status: TaskStatus.toDo},
                    {id: "task2", name: "Task 2", status: TaskStatus.inProcess},
                    {id: "task3", name: "Task 3", status: TaskStatus.toDo}
                ],
                colors: {fontColor: "#AB9800", backgroundColor: "#FBF7D7"}
            }

        ];

        return new Promise((resolve) => setTimeout(() => resolve(subjects), 1000));
    }

    public getColors(): Promise<Color[]> {
        const colors: Color[] = [
            {fontColor: "#157760", backgroundColor: "#8DDECA"},
            {fontColor: "#9B2E2E", backgroundColor: "#EEDBDB"},
            {fontColor: "#05658E", backgroundColor: "#99D4EE"},
            {fontColor: "#4F4FB9", backgroundColor: "#DBDBEE"},
            {fontColor: "#AB9800", backgroundColor: "#FBF7D7"},
            {fontColor: "#000000", backgroundColor: "#F0F0F0"}
        ];

        return new Promise((resolve) => setTimeout(() => resolve(colors), 1000));
    }
}