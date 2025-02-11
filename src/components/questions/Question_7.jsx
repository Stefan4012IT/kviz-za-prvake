import React, { useState, useEffect } from "react";
import { useScore } from "../../context/ScoreContext";

function Question7({ onNext }) {
    const { addScore } = useScore();
    const [showSequence, setShowSequence] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    // Niz za prikazivanje
    const sequence = [
        { id: 1, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
        { id: 2, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_macka.png" },
        { id: 3, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
        { id: 4, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
    ];

    // Opcije za izbor
    const options = [
        {
            id: 1,
            value: [
                { id: 1, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 2, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 3, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_macka.png" },
                { id: 4, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
            ],
            label: "1 kuca, 1 kuca, 1 maca, 1 kuca",
        },
        {
            id: 2,
            value: [
                { id: 1, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 2, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_macka.png" },
                { id: 3, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 4, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
            ],
            label: "1 kuca, 1 maca, 1 kuca, 1 kuca",
        },
        {
            id: 3,
            value: [
                { id: 1, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_macka.png" },
                { id: 2, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 3, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
                { id: 4, imgSrc: process.env.PUBLIC_URL + "/img/question_7/kviz_pas.png" },
            ],
            label: "1 maca, 1 kuca, 1 kuca, 1 kuca",
        },
    ];

    const correctOption = 2;

    useEffect(() => {
        // Prikaži niz na 10 sekundi, zatim sakrij
        const timer = setTimeout(() => setShowSequence(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleOptionClick = (id) => {
        setSelectedOption(id); // Korisnik može da promeni izbor
    };

    const handleSubmit = () => {
        if (selectedOption === correctOption) {
            addScore(2); // Dodaj 2 boda za tačan odgovor
        }
        onNext();
    };

    return (
        <div className="question-7">
            <div className="question-container">
                <h2>Pogledaj niz i zapamti ga:</h2>
                {showSequence ? (
                    <div className="sequence">
                        {sequence.map((item) => (
                            <img key={item.id} src={item.imgSrc} alt={`Zivotinja ${item.id}`} className="sequence-image" />
                        ))}
                    </div>
                ) : (
                    <>
                    <h3>Koji niz je tačan?</h3>
                    <div className="options">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`option ${selectedOption === option.id ? "selected" : ""}`}
                                onClick={() => handleOptionClick(option.id)}
                            >
                                {option.value.map((animal, index) => (
                                    <img
                                        key={index}
                                        src={animal.imgSrc}
                                        alt={`Option ${option.id} Animal ${index + 1}`}
                                        className="option-image"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
            <div
                className={`${showSequence ? "display-none" : ""} submit-btn`}
                onClick={handleSubmit}
            >
                Dalje
            </div>
        </div>
    );
}

export default Question7;
