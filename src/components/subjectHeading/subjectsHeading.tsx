import React, {useRef, useState} from "react";
import "./subjectsHeading.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";

const SubjectsHeading: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const {randomColor, searchingValue, isRemoveModeOpen} = useAppSelector(state => state.subject);
    const {setSearchingValue, setIsModalOpen, setIsRemoveModeOpen} = useActions();

    function toggleSearchInput(): void {
        setIsSearchOpen(!isSearchOpen);
        if (inputRef.current && !isSearchOpen) {
            inputRef.current.focus();
        } else if (inputRef.current && isSearchOpen) {
            inputRef.current.blur();
            setSearchingValue("");
        }
    }

    function onModalOpen(): void {
        setIsModalOpen(true);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const fontStyle = {
        color: randomColor.fontColor
    };

    const searchCircleStyle = {
        boxShadow: `0 0 0 3px ${randomColor.fontColor}`
    };

    const searchStyle = {
        backgroundColor: randomColor.fontColor
    };

    const searchInputStyle = {
        borderBottom: `2px solid ${randomColor.fontColor}`
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
                            style={isRemoveModeOpen ? selected : {}}
                            onClick={() => setIsRemoveModeOpen(!isRemoveModeOpen)}>
                        Remove
                    </button>
                    <input type="text" placeholder={"Search.."}
                           className={`searchInput ${isSearchOpen ? "showInput" : "hideInput"}`}
                           style={searchInputStyle}
                           ref={inputRef}
                           value={searchingValue}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchingValue(e.target.value)}
                    />
                    <button className={"searchButton"} onClick={toggleSearchInput}>
                        <span className={"searchButtonCircle"} style={searchCircleStyle}></span>
                        <span className={"searchButtonSquare"} style={searchStyle}></span>
                    </button>
                </div>
                <div className="searchInputCover"></div>
            </header>
        </>
    );
};

export default SubjectsHeading;