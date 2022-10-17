import Color from "../types/Color";

export const submitButtonStyle = (randomColor: Color) => {
    return {
        color: randomColor.backgroundColor,
        backgroundColor: randomColor.fontColor,
        borderRadius: "26px",
        border: `1px solid ${randomColor.fontColor}`,
        ":hover": {
            backgroundColor: randomColor.fontColor,
        },
        marginBottom: "10px"
    };
};

export const closeButtonStyle = (randomColor: Color) => {
    return {
        color: randomColor.fontColor,
        backgroundColor: randomColor.backgroundColor,
        borderRadius: "26px",
        border: `1px solid ${randomColor.fontColor}`,
        ":hover": {
            backgroundColor: randomColor.backgroundColor
        },
        marginBottom: "10px"
    };
};