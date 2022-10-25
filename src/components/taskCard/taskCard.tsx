import React, {useState} from "react";
import Task from "../../types/Task";
import "./taskCard.scss";
import {ButtonGroup, IconButton} from "@mui/material";
import {useAppSelector} from "../../hooks/useAppSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface TaskCardInterface {
    task: Task
}

const TaskCard: React.FC<TaskCardInterface> = ({task}) => {

    const {randomColor} = useAppSelector(state => state.subject);

    const [isTaskCardModalOpen, setIsTaskCardModalOpen] = useState<boolean>(false);

    const moreTaskButtonStyle = {
        borderRadius: "inherit",
        display: "flex",
        justifyContent: "space-between",
        width: "30px",
        height: "80%",
        color: randomColor.backgroundColor,
        position: "absolute",
        right: "0",
        marginRight: "4px"
    };

    const dotMoreTaskButtonStyle = {
        backgroundColor: randomColor.fontColor,
        width: "4px",
        height: "4px",
        borderRadius: "100%"
    };

    const buttonGroupStyle = {
        position: "absolute",
        right: "0"
    };

    const TaskMoreButton: React.FC = () => (
        <IconButton sx={moreTaskButtonStyle} onClick={() => setIsTaskCardModalOpen(true)}>
            <div style={dotMoreTaskButtonStyle}></div>
            <div style={dotMoreTaskButtonStyle}></div>
            <div style={dotMoreTaskButtonStyle}></div>
        </IconButton>
    );

    const TaskCardModal: React.FC = () => (
        <ButtonGroup sx={buttonGroupStyle}>
            <IconButton aria-label="delete" color="error">
                <DeleteIcon/>
            </IconButton>
            {/*<IconButton aria-label="edit" color="default">*/}
            {/*    <EditRoundedIcon/>*/}
            {/*</IconButton>*/}
            <IconButton aria-label="close" color="default" onClick={() => setIsTaskCardModalOpen(false)}>
                <CloseRoundedIcon/>
            </IconButton>
        </ButtonGroup>
    );

    return (
        <section className="taskCardSection">
            <h4>
                {
                    task.name
                }
            </h4>
            {
                isTaskCardModalOpen ? <TaskCardModal/> : <TaskMoreButton/>
            }
        </section>
    );
};

export default TaskCard;