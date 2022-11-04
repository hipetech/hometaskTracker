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
import {DragDropContext, DraggableLocation, DropResult} from "react-beautiful-dnd";
import Subject from "../../types/Subject";
import Task from "../../types/Task";

const TaskPage: React.FC = () => {
    const {_id} = useParams<{ _id: string }>();

    const fetchService = new FetchService();

    const {subject, isFormOpen} = useAppSelector(state => state.task);
    const {setSubject, setIsFormOpen} = useActions();

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
        let type = [];

        switch (status) {
            case TaskStatus.toDo:
                type = [...subject.toDo];
                break;
            case TaskStatus.inProcess:
                type = [...subject.inProcess];
                break;
            case TaskStatus.complete:
                type = [...subject.complete];
                break;
        }

        return type.map((task, index) => {
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
            ...task,
            status: droppableId as TaskStatus,
        }
    );

    function getTasksByStatus(status: TaskStatus, subject: Subject): Task[] {
        switch (status) {
            case TaskStatus.toDo:
                return [...subject.toDo];
            case TaskStatus.inProcess:
                return [...subject.inProcess];
            case TaskStatus.complete:
                return [...subject.complete];
        }
    }

    async function putSubjectOnDragEnd(subject: Subject): Promise<void> {
        const subjectBody = {
            ...subject,
            toDo: subject.toDo.map(elem => elem._id),
            inProcess: subject.inProcess.map(elem => elem._id),
            complete: subject.complete.map(elem => elem._id)
        };

        await fetchService.putSubject(subjectBody);
    }

    function setTaskArr(status: TaskStatus, subject: Subject, arr: Task[]): Subject {
        switch (status) {
            case TaskStatus.toDo:
                subject = {
                    ...subject,
                    toDo: arr
                };
                break;
            case TaskStatus.inProcess:
                subject = {
                    ...subject,
                    inProcess: arr
                };
                break;
            case TaskStatus.complete:
                subject = {
                    ...subject,
                    complete: arr
                };
                break;
        }

        return subject;
    }

    function changeTaskStatus(destination: DraggableLocation, source: DraggableLocation, task: Task, tmpSubject: Subject): Subject {
        const sourceArr = getTasksByStatus(source.droppableId as TaskStatus, subject);
        const targetArr = getTasksByStatus(destination.droppableId as TaskStatus, subject);

        task = tmpTask(destination.droppableId, task);

        sourceArr.splice(source.index, 1);

        targetArr.splice(destination.index, 0, task);

        tmpSubject = setTaskArr(source.droppableId as TaskStatus, tmpSubject, sourceArr);
        tmpSubject = setTaskArr(destination.droppableId as TaskStatus, tmpSubject, targetArr);

        return tmpSubject;
    }

    function changeTaskPosition(destination: DraggableLocation, source: DraggableLocation, task: Task, tmpSubject: Subject): Subject {
        const sourceArr = getTasksByStatus(source.droppableId as TaskStatus, subject);

        sourceArr.splice(source.index, 1);

        sourceArr.splice(destination.index, 0, task);

        tmpSubject = setTaskArr(source.droppableId as TaskStatus, tmpSubject, sourceArr);

        return tmpSubject;
    }

    async function putTaskOnDragEnd(draggableId: string, droppableId: string): Promise<void> {
        const taskBody = {
            _id: draggableId,
            status: droppableId as TaskStatus
        };

        await fetchService.putTask(taskBody);
    }

    async function setSubjectOnDragEnd(result: DropResult, destination: DraggableLocation): Promise<void> {
        const {source, draggableId} = result;

        const sourceArr = getTasksByStatus(source.droppableId as TaskStatus, subject);
        const task = sourceArr.find(task => task._id === draggableId);

        let tmpSubject = {...subject};

        if (source.droppableId !== destination.droppableId && task) {
            tmpSubject = changeTaskStatus(destination, source, task, tmpSubject);
        } else if (task) {
            tmpSubject = changeTaskPosition(destination, source, task, tmpSubject);
        }

        setSubject(tmpSubject);

        await putSubjectOnDragEnd(tmpSubject);
    }

    async function onDragEnd(result: DropResult): Promise<void> {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        await setSubjectOnDragEnd(result, destination);
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
                        Tasks: {subject.toDo.length + subject.inProcess.length + subject.complete.length}
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