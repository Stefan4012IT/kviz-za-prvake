import React, { createContext, useContext, useState } from "react";

// Kreiramo Context
const ScoreContext = createContext();

// Kreiramo Provider komponentu
export function ScoreProvider({ children }) {
    const [score, setScore] = useState(0);

    const addScore = (points) => {
        setScore((prev) => prev + points);
    };

    return (
        <ScoreContext.Provider value={{ score, addScore }}>
            {children}
        </ScoreContext.Provider>
    );
}

// Custom Hook za korišćenje Context-a
export function useScore() {
    return useContext(ScoreContext);
}