import React, {useRef, useState} from "react";
import "./subjectsHeading.scss";
import Color from "../../types/Color";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const SubjectsHeading: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const {colors} = useTypedSelector(state => state.subject);

    const getRandomColor = (): Color => colors[Math.floor(Math.random() * colors.length)];

    const fontColor = getRandomColor().fontColor;

    const fontStyle: object = {
        color: fontColor
    };

    const searchCircleStyle: object = {
        boxShadow: `0 0 0 3px ${fontColor}`
    };

    const searchStyle: object = {
        backgroundColor: fontColor
    };


    const searchInputStyle: object = {
        borderBottom: `2px solid ${fontColor}`
    };

    function toggleSearchInput(): void {
        setIsSearchOpen(!isSearchOpen);
        if (inputRef.current && !isSearchOpen) {
            inputRef.current.focus();
        } else if (inputRef.current && isSearchOpen){
            inputRef.current.blur();
        }
    }

    return (
        <>
            <header className={"subjectsHeading"} style={fontStyle}>
                <h1>
                    Subjects
                </h1>
                <div className="subjectsHeadingButton">
                    <button className={"addButton"}>
                        Add
                    </button>
                    <button className={"removeButton"}>
                        Remove
                    </button>
                    <input type="text" placeholder={"Search.."}
                           className={`searchInput ${isSearchOpen ? "showInput" : "hideInput"}`}
                           style={searchInputStyle}
                           ref={inputRef}
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