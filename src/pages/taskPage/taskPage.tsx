import React, {useEffect, useState} from "react";
import "./taskPage.scss";
import {useParams} from "react-router-dom";
import FetchService from "../../services/fetchService";
import Subject from "../../types/Subject";
import {v4} from "uuid";
import ControlHeading from "../../components/controlHeading/controlHeading";
import TaskColumn from "../../components/taskColumn/taskColumn";

const TaskPage: React.FC = () => {
    const {_id} = useParams<{ _id: string }>();

    const fetchService = new FetchService();

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

    // column styles
    const toDoColumnStyle = {
        backgroundColor: "#EEDBDB",
        color: "#C85959"
    };

    const inProcessColumnStyle = {
        backgroundColor: "#F3F09E",
        color: "#938D0E"
    };

    const completeColumnStyle = {
        backgroundColor: "#157760",
        color: "#8EDECB"
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
        <>
            <ControlHeading backButton={true}/>
            <section className="taskSection">
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
                <section className="taskColumns">
                    <TaskColumn name={"TO DO"} color={toDoColumnStyle}>
                        <div>
                            to do
                        </div>
                    </TaskColumn>
                    <TaskColumn name={"IN PROCESS"} color={inProcessColumnStyle}>
                        <div>
                            in process
                        </div>
                    </TaskColumn>
                    <TaskColumn name={"COMPLETE"} color={completeColumnStyle}>
                        <div>
                            done
                        </div>
                    </TaskColumn>
                </section>
            </section>
        </>
    );
};

export default TaskPage;