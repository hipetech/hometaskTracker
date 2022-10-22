import React, {useState} from "react";
import "./controlHeading.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ControlHeadingProps {
    backButton: boolean
}

const ControlHeading: React.FC<ControlHeadingProps> = ({backButton}) => {
    const {randomColor} = useAppSelector(state => state.subject);

    const [languages, setLanguages] = useState<string[]>(["eng", "укр"]);

    function renderHeadingButton(): React.ReactNode {
        const node = (
            <Link to={"/"} className="headingButton back" style={headingButtonFontStyle}>
                Back
            </Link>
        );

        return backButton ? node : "";
    }

    const headingButtonFontStyle = {
        color: randomColor.fontColor
    };

    return (
        <header className={"controlHeading"}>
            {
                renderHeadingButton()
            }
            <button className={"headingButton lang"} style={headingButtonFontStyle}>
                eng
            </button>
        </header>
    );
};

export default ControlHeading;