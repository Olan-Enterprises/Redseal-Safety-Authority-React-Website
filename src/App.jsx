import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

import WhatsAppFloatingWidget from "./components/WhatsAppFloatingWidget";

function App() {
    const renderMainContent = () => {
        // Renders the application routes for the Home, Services, and Contact pages.
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
                        element={(
                            <>
                                <Services />
                                <WhatsAppFloatingWidget />
                            </>
                        )}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
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
