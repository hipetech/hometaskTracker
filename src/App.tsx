import React, {useEffect, useState} from "react";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import SubjectPage from "./pages/subjectPage/subjectPage";
import Subject from "./types/Subject";
import SubjectService from "./services/subjectService";
import Color from "./types/Color";

function App() {
    const [colors, setColors] = useState<Color[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

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

    const filterItemsOnSearching = (searchingInput: string): Subject[] => {
        return subjects.filter(item => {
            return item.name.indexOf(searchingInput) > -1;
        });
    };

    const getRandomColor = (): Color => colors[Math.floor(Math.random() * colors.length)];

    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);

    return (
        <div className="App">
            <Routes>
                <Route path={"/"}
                       element={<SubjectPage getRandomColor={getRandomColor}
                                             subjects={isSearching ? filterItemsOnSearching("hello") : subjects}
                                             setSubjects={setSubjects}
                                             isLoading={isLoading}

                       />
                       }/>
            </Routes>
        </div>
    );
}

export default App;
