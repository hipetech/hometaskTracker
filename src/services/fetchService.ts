import Subject from "../types/Subject";
import Color from "../types/Color";
import config from "./config.json";
import Task from "../types/Task";
import TaskStatus from "../types/TaskStatus";
import {SearchType} from "../types/SearchType";
import {SearchResult} from "../types/SearchResult";

interface postSubjectDTO {
    name: string,
    teachers: string[],
    toDo: Task[],
    inProcess: Task[],
    complete: Task[],
    colors: string
}

interface postTaskDTO {
    name: string,
    status: TaskStatus,
    subject: string
}

interface postSearchQueryDTO {
    term: string,
    searchType: SearchType
}

interface deleteTaskDTO {
    _id: string,
    subject: string
}

interface putTaskDTO {
    _id: string,
    status: TaskStatus
}

interface putSubjectDTO {
    _id: string,
    toDo: string[],
    inProcess: string[],
    complete: string[]
}

export default class FetchService {
    url: string;

    constructor() {
        this.url = config.url;
    }

    // get
    private async getResource(url: string): Promise<any> {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not get ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    public async getSubjects(): Promise<Subject[]> {
        return await this.getResource(`${this.url}/subject`);
    }

    public async getColors(): Promise<Color[]> {
        return await this.getResource(`${this.url}/color`);
    }

    public async getSubjectById(id: string | undefined): Promise<Subject> {
        return await this.getResource(`${this.url}/subject/${id}`);
    }

    // post
    private async postResource(url: string, body: any): Promise<any> {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Could not post ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    public async postSubject(body: postSubjectDTO): Promise<Subject> {
        return await this.postResource(`${this.url}/subject`, body);
    }

    public async postTask(body: postTaskDTO): Promise<Task> {
        return await this.postResource(`${this.url}/task`, body);
    }

    public async postSearchQuery(body: postSearchQueryDTO): Promise<SearchResult[]> {
        return await this.postResource(`${this.url}/search`, body);
    }

    // delete
    private async deleteResource(url: string, body: any = {}): Promise<any> {
        const res = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Could not delete ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    public async deleteSubject(id: string): Promise<Subject> {
        return await this.deleteResource(`${this.url}/subject/${id}`);
    }

    public async deleteTask(body: deleteTaskDTO): Promise<Task> {
        return await this.deleteResource(`${this.url}/task`, body);
    }

    // put
    private async putResource(url: string, body: any = {}): Promise<any> {
        const res = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`Could not put ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    public async putTask(body: putTaskDTO): Promise<Task> {
        return await this.putResource(`${this.url}/task`, body);
    }

    public async putSubject(body: putSubjectDTO): Promise<Subject> {
        return await this.putResource(`${this.url}/subject`, body);
    }
}