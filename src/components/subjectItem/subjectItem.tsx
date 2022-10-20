import React, {ReactNode, useEffect, useRef, useState} from "react";
import Subject from "../../types/Subject";
import "./subjectItem.scss";
import {v4} from "uuid";
import {useAppSelector} from "../../hooks/useAppSelector";
import FetchService from "../../services/fetchService";
import {Button} from "@mui/material";
import {submitButtonStyle, cancelButtonStyle} from "../../styles/materialUIStyles";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {useActions} from "../../hooks/useActions";

interface SubjectItemProps {
    subject: Subject
}

const SubjectItem: React.FC<SubjectItemProps> = ({subject}) => {

    const {isDeleteMode} = useAppSelector(state => state.subject);
    const {setSubjects} = useActions();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const wrapperRef = useRef(null);

    function renderTeachers(): ReactNode {
        return subject.teachers.map(teacher => <h4 key={v4()}>{teacher}</h4>);
    }

    function openDeleteModal(): void {
        setIsDeleteModalOpen(true);
    }

    const fetchService = new FetchService();

    function deleteSubject(id: string): void {
        fetchService.deleteSubject(id)
            .then(() => {
                fetchService.getSubjects()
                    .then(setSubjects);
            });
    }

    function closeModal(): void {
        setIsDeleteModalOpen(false);
    }

    const isModalOpenCondition = isDeleteModalOpen && isDeleteMode ? "" : "disable";

    function closeModalOnCloseDeleteMode(): void {
        if (!isDeleteMode) {
            setIsDeleteModalOpen(false);
        }
    }

    const subjectItemBackgroundStyle = {
        backgroundColor: subject.colors.backgroundColor
    };

    const subjectItemFontStyle = {
        color: subject.colors.fontColor
    };

    const closeButtonStyle = {
        backgroundColor: subject.colors.fontColor,
        color: subject.colors.backgroundColor
    };


    useEffect(closeModalOnCloseDeleteMode, [isDeleteMode]);
    useOutsideClick(wrapperRef, closeModal);

    return (
        <>
            <section className={`subjectItemSection ${isDeleteMode ? "onRemove" : ""}`}
                     style={subjectItemBackgroundStyle}>
                <div className="subjectInfo">
                    <h3 style={subjectItemFontStyle}>
                        {
                            subject.name
                        }
                    </h3>
                    <section style={subjectItemFontStyle} className={"teacherNames"}>
                        {
                            renderTeachers()
                        }
                    </section>
                </div>
                <div className="subjectCounter">
                    <h2 style={subjectItemFontStyle}>
                        {
                            subject.tasks.length
                        }
                    </h2>
                </div>
                <button className={`removeItemButton ${isDeleteMode ? "" : "disable"}`}
                        style={closeButtonStyle}
                        onClick={openDeleteModal}>
                    <span>+</span>
                </button>
                <section className={`removeModal ${isModalOpenCondition}`}
                         ref={wrapperRef}>
                    <h4 style={subjectItemFontStyle}>
                        Are you sure that you want to delete it?
                    </h4>
                    <div className="removeModalBtnGroup">
                        <Button sx={submitButtonStyle(subject.colors)}
                                onClick={() => deleteSubject(subject._id)}
                        >
                            Delete
                        </Button>
                        <Button sx={cancelButtonStyle(subject.colors)}
                                onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                </section>
                <div className={`removeModalBlur ${isModalOpenCondition}`}></div>
            </section>
        </>
    );
};

export default SubjectItem;