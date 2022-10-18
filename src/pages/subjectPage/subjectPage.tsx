import React, {useEffect, useState} from "react";
import SubjectsHeading from "../../components/subjectHeading/subjectsHeading";
import SubjectItems from "../../components/subjectItems/subjectItems";
import LoadingAnimation from "../../components/loadingAnimation/loadingAnimation";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import FetchService from "../../services/fetchService";
import AddModal from "../../components/addModal/addModal";
import Color from "../../types/Color";

const SubjectPage: React.FC = () => {
    const {isLoading, colors} = useAppSelector(state => state.subject);

    const {setColors, setSubjects, setIsLoading, setRandomColor} = useActions();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [subjectError, setSubjectError] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [colorError, setColorError] = useState<boolean>(false);

    const subjectService: FetchService = new FetchService();

    function onRequestSubjects(): void {
        subjectService.getSubjects().then()
            .then(setSubjects)
            .then(() => setIsLoading(true))
            .catch(() => setSubjectError(true));
    }

    function getRandomColor(): Color {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function onRequestColors(): void {
        subjectService.getColors()
            .then(setColors)
            .catch(() => setColorError(true));
    }

    function onLoadRandomColor(): void {
        if (colors.length) setRandomColor(getRandomColor());
    }

    useEffect(onRequestColors, []);
    useEffect(onLoadRandomColor, [colors]);
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
                <AddModal />
            </section>
        </>
    );
};

export default SubjectPage;