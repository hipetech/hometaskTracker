import "./loadingAnimation.scss";
import React from "react";
import tea from "../../resources/tea.gif";

const LoadingAnimation: React.FC = () => (
    <>
        <img src={tea} className={"loadingGif"} alt="Loading"/>
    </>
);

export default LoadingAnimation;