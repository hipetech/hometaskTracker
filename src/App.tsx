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

    function getRandomColor(): Color {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    useEffect(onRequestColors, []);
    useEffect(onRequestSubjects, []);

    return (
        <div className="App">
            <Routes>
                <Route path={"/"}
                       element={<SubjectPage getRandomColor={getRandomColor}
                                             subjects={subjects}
                                             setSubjects={setSubjects}
                                             isLoading={isLoading}

                       />
                       }/>
            </Routes>
        </div>
    );
}

export default App;
