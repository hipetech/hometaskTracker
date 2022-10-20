import React from "react";
import "./subjectsHeading.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";

const SubjectsHeading: React.FC = () => {
    const {randomColor, isDeleteMode} = useAppSelector(state => state.subject);
    const { setIsModalOpen, setIsRemoveModeOpen} = useActions();


    function onModalOpen(): void {
        setIsModalOpen(true);
    }

    const fontStyle = {
        color: randomColor.fontColor
    };

    const searchCircleStyle = {
        boxShadow: `0 0 0 3px ${randomColor.fontColor}`
    };

    const searchStyle = {
        backgroundColor: randomColor.fontColor
    };

    const selected = {
        backgroundColor: "#c7c7c7"
    };


    return (
        <>
            <header className={"subjectsHeading"} style={fontStyle}>
                <h1>
                    Subjects
                </h1>
                <div className="subjectsHeadingButton">
                    <button className={"addButton"} onClick={onModalOpen}>
                        Add
                    </button>
                    <button className={"removeButton"}
                            style={isDeleteMode ? selected : {}}
                            onClick={() => setIsRemoveModeOpen(!isDeleteMode)}>
                        Delete
                    </button>
                    <button className={"searchButton"}>
                        <span className={"searchButtonCircle"} style={searchCircleStyle}></span>
                        <span className={"searchButtonSquare"} style={searchStyle}></span>
                    </button>
                </div>
            </header>
        </>
    );
};

export default SubjectsHeading;