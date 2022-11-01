import React, {useEffect} from "react";
import "./taskPage.scss";
import {useParams} from "react-router-dom";
import FetchService from "../../services/fetchService";
import {v4} from "uuid";
import ControlHeading from "../../components/controlHeading/controlHeading";
import TaskColumn from "../../components/taskColumn/taskColumn";
import TaskStatus from "../../types/TaskStatus";
import TaskCard from "../../components/taskCard/taskCard";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import AddTaskForm from "../../components/addTaskForm/addTaskForm";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import Subject from "../../types/Subject";
import Task from "../../types/Task";

const TaskPage: React.FC = () => {
    const {_id} = useParams<{ _id: string }>();

    const fetchService = new FetchService();

    const {subject, isFormOpen} = useAppSelector(state => state.task);
    const {setSubject, setIsFormOpen} = useActions();

    const {subjects} = useAppSelector(state => state.subject);

    const taskHeadingStyle = {
        backgroundColor: subject.colors.backgroundColor
    };

    const taskHeadingFontStyle = {
        color: subject.colors.fontColor
    };

    const addButtonStyle = {
        color: subject.colors.backgroundColor,
        backgroundColor: subject.colors.fontColor,
        position: "absolute",
        right: "22px",
        top: "45px",
        width: "60px",
        height: "60px",
        ":hover": {
            color: subject.colors.fontColor
        }
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

    const columns = [
        {status: TaskStatus.toDo, color: toDoColumnStyle},
        {status: TaskStatus.inProcess, color: inProcessColumnStyle},
        {status: TaskStatus.complete, color: completeColumnStyle}
    ];

    function renderTeachers(): React.ReactNode {
        return subject.teachers.map((teacher, index) => {
            const node = (value: string) => <h3 key={v4()} style={taskHeadingFontStyle}>{value}</h3>;
            if ((index + 1) !== subject.teachers.length) {
                return node(teacher + ",");
            }

            return node(teacher);
        });
    }

    function renderTasks(status: TaskStatus): React.ReactNode {
        return subject.tasks.map((task, index) => {
            if (task.status === status) {
                return (
                    <TaskCard task={task} key={v4()} index={index}/>
                );
            }
        });
    }

    function renderColumn(): React.ReactNode {
        return columns.map(elem => {
            return (
                <TaskColumn name={elem.status} color={elem.color} key={v4()}>
                    {
                        renderTasks(elem.status)
                    }
                </TaskColumn>
            );
        });
    }

    function onOpenButtonClick(): void {
        setIsFormOpen(!isFormOpen);
    }

    const tmpTask = (droppableId: string, task: Task): Task => (
        {
            _id: task._id,
            name: task.name,
            status: droppableId as TaskStatus,
            subject: task.subject
        }
    );

    const tmpSubject = (tmpTasks: Task[], subject: Subject) => (
        {
            _id: subject._id,
            name: subject.name,
            teachers: subject.teachers,
            tasks: tmpTasks,
            colors: subject.colors
        }
    );

    function setSubjectOnDragEnd(draggableId: string, droppableId: string): void {
        const tmpTasks = [...subject.tasks];
        const searchableTask = tmpTasks.find(task => task._id === draggableId);

        if (searchableTask) {
            const index = tmpTasks.indexOf(searchableTask);

            tmpTasks[index] = tmpTask(droppableId, subject.tasks[index]);

            setSubject(tmpSubject(tmpTasks, subject));
        }
    }

    async function putTaskOnDragEnd(draggableId: string, droppableId: string): Promise<void> {
        const taskBody = {
            _id: draggableId,
            status: droppableId as TaskStatus
        };

        await fetchService.putTask(taskBody);
    }

    async function onDragEnd(result: DropResult): Promise<void> {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        const isDroppable = destination.droppableId === source.droppableId;
        const isIndex = destination.index === source.index;

        if (isDroppable && isIndex) return;

        setSubjectOnDragEnd(draggableId, destination.droppableId);

        await putTaskOnDragEnd(draggableId, destination.droppableId);
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
                    <IconButton size={"large"} sx={addButtonStyle} onClick={onOpenButtonClick}>
                        {isFormOpen ? <CloseIcon/> : <AddIcon/>}
                    </IconButton>
                </section>
                <section className={`taskFormAndColumns ${isFormOpen ? "formVisible" : ""}`}>
                    <AddTaskForm/>
                    <div className="taskColumns">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {
                                renderColumn()
                            }
                        </DragDropContext>
                    </div>
                </section>
            </section>
        </>
    );
};

export default TaskPage;