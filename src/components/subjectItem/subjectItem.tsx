import React, {ReactNode} from "react";
import Subject from "../../types/Subject";
import "./subjectItem.scss";
import {v4} from "uuid";

interface SubjectItemProps {
    subject: Subject
}

const SubjectItem: React.FC<SubjectItemProps> = ({subject}) => {
    const subjectItemBackgroundStyle: object = {
        backgroundColor: subject.colors.backgroundColor
    };

    const subjectItemFontStyle: object = {
        color: subject.colors.fontColor
    };

    function renderTeachers(): ReactNode {
        return subject.teachers.map(teacher => <h4 key={v4()}>{teacher}</h4>);
    }


    return (
        <>
            <section className="subjectItemSection" style={subjectItemBackgroundStyle}>
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
            </section>
        </>
    );
};

export default SubjectItem;