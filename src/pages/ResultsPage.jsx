import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";

const submitToGoogleSheets = async (name, surname, totalScore, scoreSegments) => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyQvIPNiUtOzbXm7ZqgRK8IS3Nb68awyeAlKvZMpiFf40yiTjOaqr_pYnfXUlIuZCuHaQ/exec";

    console.log("📤 Šaljem podatke na Google Sheets:", name, surname, totalScore, scoreSegments);

    const data = { 
        ime: name, 
        prezime: surname, 
        predznanje: scoreSegments?.[0] || 0, 
        opazanje: scoreSegments?.[1] || 0, 
        paznja: scoreSegments?.[2] || 0, 
        logicko: scoreSegments?.[3] || 0, 
        govornojezicko: scoreSegments?.[4] || 0, 
        skor: totalScore 
    };

    try {
        await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",  
            body: JSON.stringify(data),
        });

        console.log("✅ Podaci su uspešno poslati!", data);  
    } catch (error) {
        console.error("❌ Došlo je do greške pri slanju:", error);
    }
};

function ResultsPage({ userData }) {
    const { score: totalScore, scoreSegments } = useScore();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log("🔍 Provera segmenta u ResultsPage:", scoreSegments);

        // Čekamo dok se svi segmenti ne sačuvaju
        if (scoreSegments.length >= 5) {
            setIsReady(true);
        }
    }, [scoreSegments]);

    useEffect(() => {
        if (isReady && userData?.name && userData?.surname) {
            console.log("📊 FINALNI PODACI PRE SLANJA:", {
                ime: userData.name,
                prezime: userData.surname,
                scoreSegments: scoreSegments,
                totalScore: totalScore
            });

            submitToGoogleSheets(userData.name, userData.surname, totalScore, scoreSegments);
        }
    }, [isReady, userData, totalScore, scoreSegments]);

    return (
        <div className="results-page">
            <img className="logo" src={`${process.env.PUBLIC_URL}/img/s_p_back_logo.svg`} alt="Logo" />
            <h1>Hvala,<br/>što si učestvovao u kvizu!</h1>
            {/* <h2>Osvojeni poeni: {score}</h2>
            <p>Ukupan broj bodova je sabran iz svih pitanja. Nadamo se da ste uživali!</p> */}
        </div>
    );
}

export default ResultsPage;