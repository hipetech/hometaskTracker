import React, {useEffect} from "react";
import SubjectsHeading from "../../components/subjectHeading/subjectsHeading";
import SubjectItems from "../../components/subjectItems/subjectItems";
import LoadingAnimation from "../../components/loadingAnimation/loadingAnimation";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import SubjectService from "../../services/subjectService";

const SubjectPage: React.FC = () => {
    const {isLoading} = useAppSelector(state => state.subject);

    const {setColors, setSubjects, setIsLoading} = useActions();

    const subjectService: SubjectService = new SubjectService();

    function onRequestSubjects(): void {
        subjectService.getSubjects()
            .then(setSubjects)
            .then(() => setIsLoading(true));
    }

    function onRequestColors(): void {
        subjectService.getColors()
            .then(setColors);
    }

    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);

    return (
        <>
            <section className="subjectPageSection">
                {
                    isLoading ? <SubjectsHeading/> : ""
                }
                {
                    isLoading ? <SubjectItems/> : <LoadingAnimation/>
                }
            </section>
        </>
    );
};

export default SubjectPage;