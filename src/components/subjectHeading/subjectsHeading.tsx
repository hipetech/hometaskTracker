import React, {useState} from "react";
import "./subjectsHeading.scss";

type SubjectsHeadingProps = {
    fontColor: string
};

const SubjectsHeading: React.FC<SubjectsHeadingProps> = ({fontColor}) => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const fontStyle: object = {
        color: fontColor
    };

    const searchCircleStyle = {
        boxShadow: `0 0 0 3px ${fontColor}`
    };

    const searchStyle = {
        backgroundColor: fontColor
    };

    const searchInputStyle = {
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
                    <input type="text" placeholder={"Search.."} className={"searchInput"} style={searchInputStyle} />
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