import React, { createContext, useContext, useState, useEffect } from "react";

// Kreiramo Context
const ScoreContext = createContext();

// Kreiramo Provider komponentu
export function ScoreProvider({ children }) {
    const [score, setScore] = useState(0);
    const [scoreSegments, setScoreSegments] = useState([]);
    const [currentSegmentScore, setCurrentSegmentScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinalSegmentSaved, setIsFinalSegmentSaved] = useState(false); // ✅ Sprečava prerano slanje

    const checkpoints = [4, 6, 8, 14, 19]; // Kada beležimo sekvencijalni skor
    const totalQuestions = 19; // Ukupno pitanja

    // Dodavanje bodova u ukupni skor i trenutni segment
    const addScore = (points) => {
        setScore((prev) => prev + points);
        setCurrentSegmentScore((prev) => prev + points);
    };

    // Kada se pređe checkpoint, beležimo skor i resetujemo trenutni segment
    useEffect(() => {
        if (checkpoints.includes(currentQuestionIndex)) {
            setScoreSegments((prevSegments) => [...prevSegments, currentSegmentScore]);
            console.log(`📌 Sačuvan segmentirani skor: ${currentSegmentScore} na pitanju ${currentQuestionIndex}`);
            setCurrentSegmentScore(0);
        }
    }, [currentQuestionIndex]);

    // ✅ Kada dođemo do poslednjeg pitanja, sačekaj da se sačuva pre nego što završi kviz
    useEffect(() => {
        if (currentQuestionIndex === totalQuestions && !isFinalSegmentSaved) {
            setScoreSegments((prevSegments) => {
                const updatedSegments = [...prevSegments, currentSegmentScore];
                console.log(`🏁 Sačuvan finalni segment: ${currentSegmentScore}`);
                return updatedSegments;
            });

            setIsFinalSegmentSaved(true); // ✅ Sprečava ponovno dodavanje finalnog segmenta
        }
    }, [currentQuestionIndex, isFinalSegmentSaved]);

    const nextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <ScoreContext.Provider value={{ score, addScore, scoreSegments, nextQuestion, currentSegmentScore }}>
            {children}
        </ScoreContext.Provider>
    );
}

// Custom Hook za korišćenje Context-a
export function useScore() {
    return useContext(ScoreContext);
}
