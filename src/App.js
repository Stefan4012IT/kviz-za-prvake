import React, { useState } from "react";
import GreetingPage from "./pages/GreetingPage";
import Quiz from "./pages/Quiz";
import { ScoreProvider } from "./context/ScoreContext";

function App() {
    const [userData, setUserData] = useState(null);

    const handleGreetingSubmit = (data) => {
        setUserData(data);
    };

    return (
        <ScoreProvider>
            <div>
                {!userData ? (
                    <GreetingPage onSubmit={handleGreetingSubmit} />
                ) : (
                    <Quiz userData={userData} />
                )}
            </div>
        </ScoreProvider>
    );
}

export default App;
