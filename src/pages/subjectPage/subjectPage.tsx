import React, {useEffect} from "react";
import SubjectsHeading from "../../components/subjectHeading/subjectsHeading";
import SubjectItems from "../../components/subjectItems/subjectItems";
import LoadingAnimation from "../../components/loadingAnimation/loadingAnimation";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import SubjectService from "../../services/subjectService";
import AddModal from "../../components/addModal/addModal";
import Color from "../../types/Color";

const SubjectPage: React.FC = () => {
    const {isLoading, colors} = useAppSelector(state => state.subject);

    const {setColors, setSubjects, setIsLoading, setRandomColor} = useActions();

    const subjectService: SubjectService = new SubjectService();

    function onRequestSubjects(): void {
        subjectService.getSubjects()
            .then(setSubjects)
            .then(() => setIsLoading(true));
    }

    function getRandomColor(): Color {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function onRequestColors(): void {
        subjectService.getColors()
            .then(setColors);
    }

    function onLoadRandomColor(): void {
        if (colors.length) setRandomColor(getRandomColor());
    }

    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);
    useEffect(onLoadRandomColor, [colors]);

    return (
        <>
            <section className="subjectPageSection">
                {
                    isLoading ? <SubjectsHeading/> : ""
                }
                {
                    isLoading ? <SubjectItems/> : <LoadingAnimation/>
                }
                <AddModal />
            </section>
        </>
    );
};

export default SubjectPage;