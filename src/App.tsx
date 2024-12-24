import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DemoPage from "./DemoPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/demo" element={<DemoPage />} />
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
