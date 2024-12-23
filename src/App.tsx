import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DemoPage from "./DemoPage";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/" element={
                    <div>
                        <h1>Welcome to the App</h1>
                        <p>Go to <a href="/demo">Demo Page</a></p>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
};


export default App;
