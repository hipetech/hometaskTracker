import Subject from "../types/Subject";
import Color from "../types/Color";
import config from "./config.json";

export default class SubjectService {
    url: string;

    constructor() {
        this.url = config.url;
    }

    private async getResource(url: string):Promise<any> {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    public async getSubjects(): Promise<Subject[]> {
        return await this.getResource(`${this.url}/subject`);
    }

    public async getColors(): Promise<Color[]> {
        return await this.getResource(`${this.url}/color`);
    }
}