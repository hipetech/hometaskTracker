import React from "react";
import "./subjectsitems.scss";
import Subject from "../../types/Subject";
import SubjectItem from "../subjectItem/subjectItem";
import {useAppSelector} from "../../hooks/useAppSelector";

const SubjectItems: React.FC = () => {
    const {subjects, searchingValue} = useAppSelector(state => state.subject);

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
            <section className="subjectItemsSection">
                {
                    renderSubjectItems()
                }
            </section>
        </>
    );
};

export default SubjectItems;