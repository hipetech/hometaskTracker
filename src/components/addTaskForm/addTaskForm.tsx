import React, {useState} from "react";
import {Button} from "@mui/material";
import "./addTaskForm.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {controlButtonStyle} from "../../styles/materialUIStyles";

const AddTaskForm = () => {
    const {subject} = useAppSelector(state => state.task);

    const [taskValue, setTaskValue] = useState<string>("");

    const inputStyle = {
        marginRight: "15px",
        marginLeft: "15px",
        borderBottom: `2px solid ${subject.colors.fontColor}`
    };

    const buttonStyle = Object.assign(controlButtonStyle(subject.colors), {
        width: "150px",
        height: "50px",
        backgroundColor: subject.colors.backgroundColor
    });

    return (
        <form className="addTaskForm" onSubmit={(e) => e.preventDefault()}>
            <input type={"text"} value={taskValue} className={"modalInput"} style={inputStyle}
                   placeholder={"Task"} onChange={(e) => setTaskValue(e.target.value)}/>
            <Button type="submit" sx={buttonStyle}>
                Add
            </Button>
        </form>
    );
};

export default AddTaskForm;