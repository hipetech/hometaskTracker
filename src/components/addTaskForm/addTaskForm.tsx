import React, {FormEvent, useState} from "react";
import {Button} from "@mui/material";
import "./addTaskForm.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {controlButtonStyle} from "../../styles/materialUIStyles";
import FetchService from "../../services/fetchService";
import TaskStatus from "../../types/TaskStatus";
import {useActions} from "../../hooks/useActions";

const AddTaskForm = () => {
    const {subject} = useAppSelector(state => state.task);

    const [taskValue, setTaskValue] = useState<string>("");

    const {setSubject} = useActions();

    const inputStyle = {
        marginRight: "15px",
        marginLeft: "15px",
        borderBottom: `2px solid ${subject.colors.fontColor}`
    };

    const buttonStyle = Object.assign(controlButtonStyle(subject.colors), {
        width: "150px",
        height: "50px",
        backgroundColor: subject.colors.backgroundColor,
        boxShadow: "0 0 1.5px 0 rgba(0, 0, 0, 0.26)",
        ":hover": {
            backgroundColor: subject.colors.backgroundColor
        }
    });

    const fetchService = new FetchService();

    function postTask(): void {
        const body = {
            name: taskValue,
            status: TaskStatus.toDo,
            subject: subject._id

        };
        fetchService.postTask(body)
            .then(() => {
                fetchService.getSubjectById(subject._id)
                    .then(setSubject);
            });
    }

    function onTaskFormSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        postTask();
        setTaskValue("");
    }

    return (
        <form className="addTaskForm" onSubmit={onTaskFormSubmit}>
            <input type={"text"} value={taskValue} className={"modalInput"} style={inputStyle}
                   placeholder={"Task"} onChange={(e) => setTaskValue(e.target.value)}/>
            <Button type="submit" sx={buttonStyle}>
                Add
            </Button>
        </form>
    );
};

export default AddTaskForm;