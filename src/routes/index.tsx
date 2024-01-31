// import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from '../page/Page.tsx';

export const router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page />} />
            </Routes>
        </BrowserRouter>    
    );
}
