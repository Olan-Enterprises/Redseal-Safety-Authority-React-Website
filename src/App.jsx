import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";

function App() {
    const renderMainContent = () => {
        // Renders the application routes connecting the Home and Services pages.
        // Parameters: None.
        // Returns: JSX.Element - The BrowserRouter wrapping the defined Routes.
        // Example return: <BrowserRouter><Routes>...</Routes></BrowserRouter>.

        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/services"
                        element={<Services />}
                    />
                    <Route
                        path="*"
                        element={<Home />}
                    />
                </Routes>
            </BrowserRouter>
        );
    };

    return (
        renderMainContent()
    );
}

export default App;
