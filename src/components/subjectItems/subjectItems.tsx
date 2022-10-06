import React from "react";
import "./subjectsitems.scss";
import Subject from "../../types/Subject";
import SubjectItem from "../subjectItem/subjectItem";
import {useAppSelector} from "../../hooks/useAppSelector";

const SubjectItems:React.FC= () => {
    const {subjects} = useAppSelector(state => state.subject);

    const renderSubjectItems = (): JSX.Element[] => subjects.map((elem: Subject) => {
        return (<SubjectItem subject={elem} key={elem.id}/>);
    });

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