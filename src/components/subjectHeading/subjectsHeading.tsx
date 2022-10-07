import React, {useRef, useState} from "react";
import "./subjectsHeading.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";

const SubjectsHeading: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const {colors, searchingValue} = useAppSelector(state => state.subject);
    const {setSearchingValue} = useActions();

    function getRandomColor(): string {
        return colors[Math.floor(Math.random() * colors.length)].fontColor;
    }

    function toggleSearchInput(): void {
        setIsSearchOpen(!isSearchOpen);
        if (inputRef.current && !isSearchOpen) {
            inputRef.current.focus();
        } else if (inputRef.current && isSearchOpen) {
            inputRef.current.blur();
            setSearchingValue("");
        }
    }

    const [fontColor] = useState<string>(getRandomColor());

    const inputRef = useRef<HTMLInputElement>(null);

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