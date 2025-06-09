// src/App.tsx
import React from "react";

// Styles
import "./assets/scss/themes.scss";

// Central router component (already handles its own <BrowserRouter>)
import Routes from "./Routes";


function App() {
    return <Routes />;
}

export default App;