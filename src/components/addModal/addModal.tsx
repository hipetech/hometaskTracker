import React, {FormEvent, ReactNode, useState} from "react";
import "./addModal.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import {v4} from "uuid";
import ColorCheckbox from "../colorCheckbox/colorCheckbox";
import Color from "../../types/Color";

const AddModal: React.FC = () => {
    const [teacherCount, setTeacherCount] = useState<string>("1");
    const {randomColor, subjects, isModalOpen, colors} = useAppSelector(state => state.subject);
    const {setSubjects} = useActions();

    const [colorValue, setColorValue] = useState<Color>({backgroundColor: "", fontColor: ""});

    const modalBackground = {
        backgroundColor: randomColor.backgroundColor
    };

    const labelColor = {
        color: randomColor.fontColor
    };

    const borderInputColor = {
        borderBottom: `1px solid ${randomColor.fontColor}`
    };

    const TeacherInput: React.FC = () => {
        return (
            <>
                <input type="text" id={"teacherName"} className={"modalInput"} style={borderInputColor}
                       placeholder={"Teacher name"}/>
            </>
        );
    };

    function renderTeacherNameInput(): ReactNode[] {
        let inputs: ReactNode[] = [];

        for (let i = 0; i < Number(teacherCount); i++) {
            inputs = [...inputs, <TeacherInput key={v4()}/>];
        }
        return inputs;
    }

    function renderColorAttributes(): ReactNode[] {
        let colorAttributes: ReactNode[] = [];

        for (let i = 0; i < colors.length; i++) {
            const color: Color = colors[i];
            colorAttributes = [...colorAttributes, <ColorCheckbox name={"color"}
                                                                  color={color}
                                                                  key={v4()}
                                                                  colorValue={colorValue}
                                                                  setColorValue={setColorValue}/>];
        }

        return colorAttributes;
    }

    function onSubmit(e: React.FormEvent): void {
        e.preventDefault();
        console.log("hello world");
    }

    function onRangeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setTeacherCount(e.target.value);
    }

    return (
        <>
            <section className={`addModalSection ${isModalOpen ? "" : "disable"}`} style={modalBackground}>
                <form className="addModalForm" onSubmit={onSubmit}>
                    <input type="text" id={"subjectName"} className={"modalInput"} style={borderInputColor}
                           placeholder={"Subject name"}/>
                    <span style={labelColor} className={"modalRange"}>
                        <label htmlFor={"teacherCount"} style={labelColor} className={"teacherCountLabel"}>
                            Count of teachers:
                        </label>
                        {teacherCount}
                        <input type="range" id={"teacherCount"} min={"1"} max={"5"}
                               value={teacherCount}
                               onChange={onRangeChange}/>
                    </span>
                    {
                        renderTeacherNameInput()
                    }
                    <div className="colorAttributes">
                        {
                            renderColorAttributes()
                        }
                    </div>
                    <input type="submit" value={"Add"}/>
                </form>
            </section>
            <div className="addModalBackground"></div>
        </>
    );
};

export default AddModal;