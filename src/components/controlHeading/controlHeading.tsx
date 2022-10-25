import React from "react";
import "./controlHeading.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {Button} from "@mui/material";

interface ControlHeadingProps {
    backButton: boolean
}

const ControlHeading: React.FC<ControlHeadingProps> = ({backButton}) => {
    const {randomColor} = useAppSelector(state => state.subject);

    // const [languages, setLanguages] = useState<string[]>(["eng", "укр"]);


    const headingButtonBackStyle = {
        minWidth: "50px",
        fontWeight: "500",
        fontSize: "18px",
        borderRadius: "12px",
        padding: "5px 10px",
        color: randomColor.fontColor,
        position: "absolute",
        backgroundColor: "#F0F0F0FF",
        ":hover": {
            backgroundColor: "#F0F0F0FF"
        }
    };

    function renderHeadingButton(): React.ReactNode {
        const node = (
            <Link to={"/"}>
                <Button sx={{...headingButtonBackStyle, left: "0"}}>
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