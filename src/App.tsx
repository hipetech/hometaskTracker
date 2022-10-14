import React from "react";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import SubjectPage from "./pages/subjectPage/subjectPage";

const App: React.FC = () => {

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
