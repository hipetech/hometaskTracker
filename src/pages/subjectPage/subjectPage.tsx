import React from "react";
import SubjectsHeading from "../../components/subjectHeading/subjectsHeading";
import SubjectItems from "../../components/subjectItems/subjectItems";
import LoadingAnimation from "../../components/loadingAnimation/loadingAnimation";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const SubjectPage: React.FC = () => {
    const {isLoading} = useTypedSelector(state => state.subject);

    return (
        <>
            <section className="subjectPageSection">
                {
                    isLoading ? <SubjectsHeading /> : ""
                }
                {
                    isLoading ? <SubjectItems /> : <LoadingAnimation />
                }
            </section>
        </>
    );
};

export default SubjectPage;