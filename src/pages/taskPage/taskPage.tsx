import React, {useEffect, useState} from "react";
import "./taskPage.scss";
import {Link, useParams} from "react-router-dom";
import FetchService from "../../services/fetchService";
import Subject from "../../types/Subject";
import {v4} from "uuid";
import {useAppSelector} from "../../hooks/useAppSelector";

const TaskPage: React.FC = () => {
    const {_id} = useParams<{ _id: string }>();

    const fetchService = new FetchService();

    const {randomColor} = useAppSelector(state => state.subject);

    const [subject, setSubject] = useState<Subject>({
        name: "",
        _id: "",
        tasks: [],
        teachers: [],
        colors: {_id: "", fontColor: "", backgroundColor: ""}
    });

    const taskHeadingStyle = {
        backgroundColor: subject.colors.backgroundColor
    };

    const taskHeadingFontStyle = {
        color: subject.colors.fontColor
    };

    const headingButtonFontStyle = {
        color: randomColor.fontColor
    };

    function renderTeachers(): React.ReactNode {
        return subject.teachers.map((teacher, index) => {
            const node = (value: string) => <h3 key={v4()} style={taskHeadingFontStyle}>{value}</h3>;

            if ((index + 1) !== subject.teachers.length) {
                return node(teacher + ",");
            }

            return node(teacher);
        });
    }

    useEffect(() => {
        fetchService.getSubjectById(_id)
            .then(setSubject);
    }, []);

    return (
        <section className="taskSection">
            <header>
                <Link to={"/"} className="headingButton" style={headingButtonFontStyle}>Back</Link>
            </header>
            <section className="taskHeading" style={taskHeadingStyle}>
                <h2 style={taskHeadingFontStyle}>
                    {
                        subject.name
                    }
                </h2>
                <div className="taskHeadingTeachersList">
                    {
                        renderTeachers()
                    }
                </div>
                <h4 className="taskCounter" style={taskHeadingFontStyle}>
                    Tasks: {subject.tasks.length}
                </h4>
            </section>
        </section>
    );
};

export default TaskPage;