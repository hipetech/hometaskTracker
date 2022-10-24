import React from "react";
import "./taskColunm.scss";

interface TaskColumnHeadingColor {
    backgroundColor: string,
    color: string
}

interface TaskColumnInterface {
    name: string,
    color: TaskColumnHeadingColor,
    children: JSX.Element | JSX.Element[];
}


const TaskColumn: React.FC<TaskColumnInterface> = ({name, color, children}) => {
    return (
        <section className={"taskColumnSection"}>
            <div className={"taskColumnHeading"} style={color}>
                <h4>
                    {
                        name
                    }
                </h4>
            </div>
            <div className="taskColumnContent">
                {
                    children
                }
            </div>
        </section>
    );
};

export default TaskColumn;