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

    const onRequestSubjects = (): void => {
        subjectService.getSubjects()
            .then(setSubjects)
            .then(() => setIsLoading(true));
    };

    const onRequestColors = (): void => {
        subjectService.getColors()
            .then(setColors);
    };

    // const filterItemsOnSearching = (searchingInput: string): Subject[] => {
    //     return subjects.filter(item => {
    //         return item.name.indexOf(searchingInput) > -1;
    //     });
    // };

    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);

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