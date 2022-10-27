import React from "react";
import "./controlHeading.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {Button} from "@mui/material";
import {controlButtonStyle} from "../../styles/materialUIStyles";

interface ControlHeadingProps {
    backButton: boolean
}

const ControlHeading: React.FC<ControlHeadingProps> = ({backButton}) => {
    const {randomColor} = useAppSelector(state => state.subject);

    // const [languages, setLanguages] = useState<string[]>(["eng", "укр"]);


    const headingButtonBackStyle = controlButtonStyle(randomColor);

    function renderHeadingButton(): React.ReactNode {
        const node = (
            <Link to={"/"}>
                <Button sx={{...headingButtonBackStyle, left: "0", position: "absolute"}}>
                    Back
                </Button>
            </Link>
        );

        return backButton ? node : "";
    }

    return (
        <header className={"controlHeading"}>
            {
                renderHeadingButton()
            }
            {/*<Button sx={{...headingButtonBackStyle, right: "0"}}>*/}
            {/*    eng*/}
            {/*</Button>*/}
        </header>
    );
};

export default ControlHeading;