import React from "react";
import Subject from "../../types/Subject";
import "./subjectItem.scss";

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

    return (
        <>
            <section className="subjectItemSection" style={subjectItemBackgroundStyle}>
                <div className="subjectInfo">
                    <h3 style={subjectItemFontStyle}>
                        {
                            subject.name
                        }
                    </h3>
                    <h4 style={subjectItemFontStyle}>
                        {
                            subject.teachers
                        }
                    </h4>
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