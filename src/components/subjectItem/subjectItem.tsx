import React, {ReactNode} from "react";
import Subject from "../../types/Subject";
import "./subjectItem.scss";
import {v4} from "uuid";
import {useAppSelector} from "../../hooks/useAppSelector";

interface SubjectItemProps {
    subject: Subject
}

const SubjectItem: React.FC<SubjectItemProps> = ({subject}) => {

    const {isRemoveModeOpen} = useAppSelector(state => state.subject);

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

    function renderTeachers(): ReactNode {
        return subject.teachers.map(teacher => <h4 key={v4()}>{teacher}</h4>);
    }


    return (
        <>
            <section className={`subjectItemSection ${isRemoveModeOpen ? "onRemove": ""}`} style={subjectItemBackgroundStyle}>
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
                <button className={`removeItemButton ${isRemoveModeOpen ? "": "disable"}`}
                        style={closeButtonStyle}>
                   <span>+</span>
                </button>
            </section>
        </>
    );
};

export default SubjectItem;