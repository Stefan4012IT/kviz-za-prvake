import React from "react";
import { useScore } from "../context/ScoreContext";

function ResultsPage({ userData }) {
    const { score } = useScore();

    return (
        <div className="results-page">
            <h1>Rezultati</h1>
            <p>Hvala, {userData.name} {userData.surname}, što ste učestvovali u kvizu!</p>
            <h2>Osvojeni poeni: {score}</h2>
            <p>Ukupan broj bodova je sabran iz svih pitanja. Nadamo se da ste uživali!</p>
        </div>
    );
}

export default ResultsPage;
