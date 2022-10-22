import React from "react";
import "./App.scss";
import {Route, Routes} from "react-router-dom";
import SubjectPage from "./pages/subjectPage/subjectPage";
import TaskPage from "./pages/taskPage/taskPage";

const App: React.FC = () => {

    return (
        <div className="App">
            <Routes>
                <Route path={"/"}
                       element={<SubjectPage/>}/>
                <Route path={"/:_id"}
                       element={<TaskPage/>}/>
            </Routes>
        </div>
    );
};

export default App;
