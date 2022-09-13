import React from "react";
import "./subjectsitems.scss";
import Subject from "../../types/Subject";
import SubjectItem from "../subjectItem/subjectItem";

type SubjectItemsProps = {
    subjects: Subject[]
};

const SubjectItems:React.FC<SubjectItemsProps> = ({subjects}) => {

    function renderSubjectItems(): JSX.Element[] {
        return subjects.map((elem: Subject) => {
            return (<SubjectItem subject={elem} key={elem.id} />);
        });
    }

    return (
        <>
            <section className="subjectItemsSection">
                {
                    renderSubjectItems()
                }
            </section>
        </>
    );
};

export default SubjectItems;