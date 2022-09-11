import React from "react";
import Subject from "../../types/Subject";
import Color from "../../types/Color";
import SubjectsHeading from "../../components/subjectHeading/subjectsHeading";

type subjectPageProps = {
    getRandomColor: () => Color
    subjects: Subject[],
    setSubjects: (subjects: Subject[]) => void,
    isLoading: boolean
}

const SubjectPage: React.FC<subjectPageProps> = (props) => {
    const {subjects, setSubjects, getRandomColor, isLoading} = props;

    return (
        <>
            <section className="subjectPageSection">
                {
                    isLoading ? <SubjectsHeading fontColor={getRandomColor().fontColor}/>: ""
                }
            </section>
        </>
    );
};

export default SubjectPage;