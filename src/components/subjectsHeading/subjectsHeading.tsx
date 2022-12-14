import React from "react";
import "./subjectsHeading.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import SearchingModal from "../searchigModal/searchingModal";

const SubjectsHeading: React.FC = () => {
    const {randomColor, isDeleteMode, isSearchModalOpen} = useAppSelector(state => state.subject);

    const {setIsModalOpen, setIsDeleteMode, setIsSearchModalOpen} = useActions();

    function onModalOpen(): void {
        setIsModalOpen(true);
        setIsDeleteMode(false);
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

    function onSearchButtonClick(): void {
        setIsSearchModalOpen(!isSearchModalOpen);
    }

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
                            onClick={() => setIsDeleteMode(!isDeleteMode)}>
                        Delete
                    </button>
                    <button className={"searchButton"} onClick={onSearchButtonClick}>
                        <span className={"searchButtonCircle"} style={searchCircleStyle}></span>
                        <span className={"searchButtonSquare"} style={searchStyle}></span>
                    </button>
                </div>
                {
                    isSearchModalOpen ? <SearchingModal />: null
                }
            </header>
        </>
    );
};

export default SubjectsHeading;