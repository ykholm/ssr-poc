import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DemoPage from "./DemoPage";

type Props = {
    initialData: any
}

const App: React.FC<Props> = ({initialData}) => {
    return (
        <Routes>
            <Route path="/demo" element={<DemoPage {...initialData} />} />
            <Route path="/" element={
                <div>
                    <h1>Welcome to the App</h1>
                    <p>Go to <a href="/demo">Demo Page</a></p>
                </div>
            } />
        </Routes>
    );
};

export default App;
