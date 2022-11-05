import React, {useEffect} from "react";
import SubjectsHeading from "../../components/subjectsHeading/subjectsHeading";
import SubjectItems from "../../components/subjectItems/subjectItems";
import LoadingAnimation from "../../components/loadingAnimation/loadingAnimation";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useActions} from "../../hooks/useActions";
import FetchService from "../../services/fetchService";
import AddModal from "../../components/addModal/addModal";
import Color from "../../types/Color";
import ControlHeading from "../../components/controlHeading/controlHeading";

const SubjectPage: React.FC = () => {
    const {isLoading, colors, isSearchModalOpen, isModalOpen} = useAppSelector(state => state.subject);

    const {setColors, setSubjects, setIsLoading, setRandomColor, setIsSearchModalOpen, setIsModalOpen} = useActions();

    const subjectService: FetchService = new FetchService();

    function onRequestSubjects(): void {
        subjectService.getSubjects()
            .then(res => {
                setSubjects(res);
            })
            .then(() => setIsLoading(true))
            .catch();
    }

    function getRandomColor(colors: Color[]): Color {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function onRequestColors(): void {
        if (!colors.length) {
            subjectService.getColors()
                .then((res) => {
                    setColors(res);
                    setRandomColor(getRandomColor(res));
                })
                .catch();
        }
    }

    function onModalClose(): void {
        if (isModalOpen) setIsModalOpen(false);
        if (isSearchModalOpen) setIsSearchModalOpen(false);
    }


    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);

    return (
        <>
            <ControlHeading backButton={false}/>
            <section className="subjectPageSection">
                {
                    isLoading ? <SubjectsHeading/> : ""
                }
                {
                    isLoading ? <SubjectItems/> : <LoadingAnimation/>
                }
                <AddModal/>
                <div className={`addModalBackground ${isModalOpen || isSearchModalOpen ? "" : "disable"}`}
                     onClick={onModalClose}></div>
            </section>
        </>
    );
};

export default SubjectPage;