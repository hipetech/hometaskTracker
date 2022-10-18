import React, {ReactNode, useState} from "react";
import "./addModal.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import {v4} from "uuid";
import ColorCheckbox from "../colorCheckbox/colorCheckbox";
import Color from "../../types/Color";
import {Button, Slider} from "@mui/material";
import {closeButtonStyle, submitButtonStyle} from "../../styles/materialUIStyles";
import {isEmpty} from "../../services/validationService";
import SubjectService from "../../services/subjectService";

const AddModal: React.FC = () => {

    const {randomColor, isModalOpen, colors} = useAppSelector(state => state.subject);
    const {setIsModalOpen, setSubjects} = useActions();

    const [currentInputValue, setCurrentInputValue] = useState<string>();

    // form values
    const [subjectName, setSubjectName] = useState<string>("");

    const [teachers, setTeachers] = useState<string[]>([""]);
    const [teacherCount, setTeacherCount] = useState<number>(1);

    const [colorValue, setColorValue] = useState<Color>({backgroundColor: "", fontColor: "", _id: ""});


    const [isTextInputsValid, setIsTextInputsValid] = useState<boolean>(true);
    const [isColorInputValid, setIsColorInputValid] = useState<boolean>(true);

    const subjectService = new SubjectService();

    function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setSubjectName(e.target.value);
        setCurrentInputValue(e.target.value);
    }

    function onTeacherInputChange(i: number, e: any): void {
        const tmp = [...teachers];
        tmp[i] = e.target.value;
        setCurrentInputValue(e.target.value);
        setTeachers(tmp);
    }

    const TeacherInput: React.FC<{ i: number, value: string }> = ({i, value}) => {
        return (
            <>
                <input type="text" id={"teacherName"} className={"modalInput"}
                       style={isBorderError}
                       placeholder={"Teacher name"}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTeacherInputChange(i, e)}
                       autoComplete={"off"}
                       value={value}
                       autoFocus={currentInputValue === value}
                />
            </>
        );
    };

    function renderTeacherNameInput(): ReactNode[] {
        return teachers.map((teacher, index) => {
            return <TeacherInput key={v4()} i={index} value={teacher}/>;
        });
    }


    function renderColorAttributes(): ReactNode[] {
        return colors.map(color => {
            return <ColorCheckbox name={"color"}
                                  color={color}
                                  key={v4()}
                                  colorValue={colorValue}
                                  setColorValue={setColorValue}
                                  colorState={isColorInputValid}
            />;
        });
    }

    function setTeachersOnRange(value: number): void {
        if (value > teacherCount) {
            const arr = [...teachers, ...new Array<string>(value - teachers.length).fill("")];
            setTeachers(arr);

        } else {
            setTeachers(teachers.slice(0, value));
        }
    }

    function onRangeChange(e: any): void {
        const value = Number(e.target.value);
        setTeachersOnRange(value);
        setTeacherCount(value);
    }

    function validateTextInputs(): boolean {
        if (!isEmpty(subjectName)) return false;
        else return teachers.every(isEmpty);
    }

    function validateColorRadiobutton(): boolean {
        return isEmpty(colorValue.fontColor) || isEmpty(colorValue.backgroundColor);

    }

    function isValid(validator: boolean, setter: (bool: boolean) => void) {
        if (validator) setter(true);
        else setter(false);
    }

    function validateInputs(validateTextInputs: boolean, validateColorRadiobutton: boolean): void {
        isValid(validateTextInputs, setIsTextInputsValid);
        isValid(validateColorRadiobutton, setIsColorInputValid);
    }

    function clearInputs(): void {
        setSubjectName("");
        setTeachers(teachers.fill(""));
        setColorValue({_id: "", fontColor: "", backgroundColor: ""});
    }

    function postFromData(): void {
        const body = {
            name: subjectName,
            teachers: teachers,
            tasks: [],
            colors: colorValue._id
        };

        subjectService.postSubject(body)
            .then(clearInputs)
            .then(() => setIsModalOpen(false))
            .then(() => {
                subjectService.getSubjects()
                    .then(setSubjects);
            });
    }


    function onFormSubmit(e: React.FormEvent): void {
        e.preventDefault();

        const isValidTextInputs = validateTextInputs();
        const isValidColorRadiobutton = validateColorRadiobutton();

        validateInputs(isValidTextInputs, isValidColorRadiobutton);

        if (isValidTextInputs && isValidColorRadiobutton) postFromData();
    }

    function onModalClose(): void {
        setIsModalOpen(false);
    }

    // styles
    const fontColor = {
        color: randomColor.fontColor
    };

    const borderInputColor = {
        borderBottom: `1px solid ${randomColor.fontColor}`
    };

    const errorBorderColor = {
        borderBottom: "2px solid #771515"
    };

    const isBorderError = isTextInputsValid ? borderInputColor : errorBorderColor;

    const marks = [
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"}
    ];

    const error = {
        _id: "Input Error",
        fontColor: "#771515",
        backgroundColor: "#de8d8d"
    };

    const condition = isTextInputsValid && isColorInputValid;
    const isButtonBackgroundError = condition ? randomColor : error;

    return (
        <>
            <section className={`addModalSection ${isModalOpen ? "" : "disable"}`}>
                <form className="addModalForm" onSubmit={onFormSubmit}>
                    <input type="text" id={"subjectName"} className={"modalInput"}
                           style={isBorderError}
                           placeholder={"Subject name"} value={subjectName}
                           onChange={onNameInputChange}
                           autoComplete={"off"}
                    />
                    <span className={"modalRange"}>
                        <label htmlFor={"teacherCount"} style={fontColor} className={"teacherCountLabel"}>
                            Count of teachers:
                        </label>
                        <Slider
                            id={"teacherCount"}
                            step={1}
                            marks={marks}
                            min={1}
                            max={5}
                            value={teacherCount}
                            onChange={onRangeChange}
                            sx={{color: randomColor.fontColor}}
                        />
                    </span>
                    {
                        renderTeacherNameInput()
                    }
                    <div className="colorAttributes">
                        {
                            renderColorAttributes()
                        }
                    </div>
                    <Button sx={submitButtonStyle(isButtonBackgroundError)}
                            size="large" type="submit">
                        {
                            condition ? "Add" : "Your input data is wrong, click to resubmit"
                        }
                    </Button>
                    <Button sx={closeButtonStyle(randomColor)}
                            size="large"
                            onClick={onModalClose}>
                        Close
                    </Button>
                </form>
            </section>
            <div className={`addModalBackground ${isModalOpen ? "" : "disable"}`} onClick={onModalClose}></div>
        </>
    );
};

export default AddModal;