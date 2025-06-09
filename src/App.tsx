// src/App.tsx
import React from 'react'
import './assets/scss/themes.scss' // Styles
import AppRoutes from './Routes' // Central router component (already handles its own <BrowserRouter>)//

function App() {
    return <AppRoutes />;
}

export default App;
