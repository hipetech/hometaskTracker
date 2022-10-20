import Color from "../types/Color";

export const submitButtonStyle = (color: Color) => {
    return {
        color: color.backgroundColor,
        backgroundColor: color.fontColor,
        borderRadius: "26px",
        border: `1px solid ${color.fontColor}`,
        ":hover": {
            backgroundColor: color.fontColor,
        },
        marginBottom: "10px"
    };
};

export const cancelButtonStyle = (color: Color) => {
    return {
        color: color.fontColor,
        backgroundColor: color.backgroundColor,
        borderRadius: "26px",
        border: `1px solid ${color.fontColor}`,
        ":hover": {
            backgroundColor: color.backgroundColor
        },
        marginBottom: "10px"
    };
};