import React from "react";
import "./taskColunm.scss";
import {Droppable} from "react-beautiful-dnd";

interface TaskColumnHeadingColor {
    backgroundColor: string,
    color: string,

}

interface TaskColumnInterface {
    name: string,
    color: TaskColumnHeadingColor,
    children: React.ReactNode | React.ReactNode[];
}

const TaskColumn: React.FC<TaskColumnInterface> = ({name, color, children}) => {
    return (
        <Droppable droppableId={name}>
            {
                (provided, snapshot) => {
                    return (
                        <section className={"taskColumnSection"}>
                            <div className={"taskColumnHeading"} style={color}>
                                <h4>
                                    {
                                        name
                                    }
                                </h4>
                            </div>
                            <div className={`taskColumnContent
                            ${snapshot.isDraggingOver ? "isDraggingStart" : "isDraggingOver "}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {
                                    children
                                }
                                {provided.placeholder}
                            </div>
                        </section>
                    );
                }
            }
        </Droppable>
    );
};

export default TaskColumn;