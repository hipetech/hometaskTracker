import React from "react";
import "./controlHeading.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {Button} from "@mui/material";
import {controlButtonStyle} from "../../styles/materialUIStyles";
import {useActions} from "../../hooks/useActions";

interface ControlHeadingProps {
    backButton: boolean
}

const ControlHeading: React.FC<ControlHeadingProps> = ({backButton}) => {
    const {randomColor} = useAppSelector(state => state.subject);

    const {setSubject} = useActions();

    // const [languages, setLanguages] = useState<string[]>(["eng", "укр"]);


    const headingButtonBackStyle = controlButtonStyle(randomColor);

    function onBackButtonClick(): void {
        const emptySubject = {
            _id: "",
            name: "",
            toDo: [],
            inProcess: [],
            complete: [],
            colors: {_id: "", backgroundColor: "", fontColor: ""},
            teachers: []
        };

        setSubject(emptySubject);
    }

    function renderHeadingButton(): React.ReactNode {
        const node = (
            <Link to={"/"}>
                <Button sx={{...headingButtonBackStyle, left: "0", position: "absolute"}} onClick={onBackButtonClick}>
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