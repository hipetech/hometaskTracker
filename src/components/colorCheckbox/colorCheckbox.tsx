import React from "react";
import {v4} from "uuid";
import "./colorCheckbox.scss";
import Color from "../../types/Color";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ColorCheckboxProps {
    name: string,
    color: Color,
    colorValue: Color,
    setColorValue: (color: Color) => void
}

const ColorCheckbox:React.FC<ColorCheckboxProps> = ({color, name, setColorValue, colorValue}) => {
    const id: string = v4();

    const {randomColor} = useAppSelector(state => state.subject);

    const backgroundColor: object = {
        backgroundColor: color.backgroundColor,
        borderColor: color.fontColor
    };

    const pointerColor: object = {
        backgroundColor: randomColor.fontColor
    };

    function setValue(): void {
        setColorValue(color);
    }

    const isColorActive: string = colorValue.backgroundColor === color.backgroundColor ? "activePointer": "";

    return (
        <>
            <div className="checkbox">
                <label htmlFor={id} className="colorLabel" style={backgroundColor}
                       onClick={setValue}></label>
                <input type="radio" name={name} id={id} className={"colorRadio"} />
                <div className={isColorActive} style={pointerColor}></div>
            </div>
        </>
    );
};

export default ColorCheckbox;