import React from "react";
import "./subjectsitems.scss";
import Subject from "../../types/Subject";
import SubjectItem from "../subjectItem/subjectItem";
import {useAppSelector} from "../../hooks/useAppSelector";

const SubjectItems: React.FC = () => {
    const {subjects, searchingValue, randomColor} = useAppSelector(state => state.subject);

    function filterBySearchValue(): Subject[] {
        return subjects.filter((subject: Subject) => {
            return subject.name.toLowerCase().indexOf(searchingValue.toLowerCase()) > -1;
        });
    }

    function renderSubjectItems(): JSX.Element[] {
        const filteredSubjects = filterBySearchValue();
        return filteredSubjects.map((elem: Subject) => {
            return (<SubjectItem subject={elem} key={elem._id}/>);
        });
    }

    return (
        <>
            <section className="subjectItemsCaption">
                {
                    subjects.length ? null : <h2 style={{color: randomColor.fontColor}}>There is no subjects</h2>
                }
            </section>
            <section className="subjectItemsSection">
                {
                    subjects.length ? renderSubjectItems(): null
                }
            </section>
        </>
    );
};

export default SubjectItems;