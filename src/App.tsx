import React, {useEffect} from "react";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import SubjectPage from "./pages/subjectPage/subjectPage";
import SubjectService from "./services/subjectService";
import {useActions} from "./hooks/useActions";

const App: React.FC = () => {
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
        <div className="App">
            <Routes>
                <Route path={"/"}
                       element={<SubjectPage />
                       }/>
            </Routes>
        </div>
    );
};

export default App;
