import React, {useEffect} from "react";
import { useScore } from "../context/ScoreContext";

const submitToGoogleSheets = async (name, surname, score) => {
        const scriptURL = "https://script.google.com/macros/s/AKfycbwWI2AzpLI3t4wlgB-GoVHmkJcutqRPhAUcIezWv0vU8awmKZxKoZur6hiQzv_2hURHzg/exec";

        console.log("Šaljem podatke na Google Sheets:", name, surname, score);

        const data = { ime: name, prezime: surname, skor: score };

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "no-cors",  
                body: JSON.stringify(data),
        });

        console.log("Podaci su poslati!");  
        } catch (error) {
            console.error("Došlo je do greške:", error);
        }
    };




function ResultsPage({ userData }) {
    const { score } = useScore();

    useEffect(() => {
        if (userData?.name && userData?.surname) {
            submitToGoogleSheets(userData.name, userData.surname, score);
        }
    }, [userData, score]);  

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
