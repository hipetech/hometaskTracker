import Subject from "../types/Subject";
import Color from "../types/Color";
import config from "./config.json";
import Task from "../types/Task";

export default class SubjectService {
    url: string;

    constructor() {
        this.url = config.url;
    }

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
            console.log(res.json());
            throw new Error(`Could not post ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    public async postSubject(body: {
        name: string,
        teachers: string[],
        tasks: Task[],
        colors: string
    }): Promise<Subject> {
        return await this.postResource(`${this.url}/subject`, body);
    }


}