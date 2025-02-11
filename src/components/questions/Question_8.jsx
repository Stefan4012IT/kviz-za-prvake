import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useScore } from "../../context/ScoreContext";
import "../../styles/question-8.scss";

// Komponenta za prevlačive elemente
function DraggableItem({ id, imgSrc }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="draggable-item"
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
            }}
        >
            <img src={imgSrc} alt="cvijet" className="flower-image" />
        </div>
    );
}

// Komponenta za ciljana polja gde se prebacuju elementi
function DroppableBox({ id, droppedItem }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={`droppable-box ${isOver ? "hovered" : ""}`}>
            {droppedItem ? (
                <img src={droppedItem.imgSrc} alt="cvijet" className="flower-image" />
            ) : (
                <span>?</span>
            )}
        </div>
    );
}

function Question8({ onNext }) {
    const { addScore } = useScore();
    const [showSequence, setShowSequence] = useState(true);
    const [userSequence, setUserSequence] = useState([null, null, null, null]);

    // Ponudjeni elementi sa tačnim ID-jevima i slikama
    const [availableOptions, setAvailableOptions] = useState([
        { id: "crveni-cvet", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_crveniCvet.png" },
        { id: `plavi-cvet-${Math.random()}`, imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_plaviCvet.png" },
        { id: `zuta-lala-${Math.random()}`, imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_zutaLala.png" },
        { id: "crvena-lala", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_crvenaLala.png" },
        { id: `zuta-lala-${Math.random()}`, imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_zutaLala.png" },
        { id: `plavi-cvet-${Math.random()}`, imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_plaviCvet.png" },
    ]);

    // Početni niz koji korisnik treba da zapamti
    const correctSequence = [
        { id: "crveni-cvet", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_crveniCvet.png" },
        { id: "zuta-lala", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_zutaLala.png" },
        { id: "plavi-cvet", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_plaviCvet.png" },
        { id: "zuta-lala", imgSrc: process.env.PUBLIC_URL + "/img/question_8/kviz_zutaLala.png" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setShowSequence(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItem = availableOptions.find((item) => item.id === active.id) ||
            userSequence.find((item) => item && item.id === active.id);

        if (!draggedItem) return;

        const targetIndex = over.id.startsWith("box-") ? parseInt(over.id.replace("box-", ""), 10) : null;
        const sourceIndex = userSequence.findIndex((item) => item && item.id === active.id);

        let updatedSequence = [...userSequence];
        let updatedOptions = [...availableOptions];

        if (targetIndex !== null) {
            if (updatedSequence[targetIndex]) {
                updatedOptions.push(updatedSequence[targetIndex]); // Vraćanje starog elementa u ponuđene opcije
            }
            updatedSequence[targetIndex] = draggedItem;
            updatedOptions = updatedOptions.filter((item) => item.id !== draggedItem.id);
        } else {
            updatedOptions.push(draggedItem);
            updatedSequence = updatedSequence.map((item) => (item && item.id === active.id ? null : item));
        }

        setUserSequence(updatedSequence);
        setAvailableOptions(updatedOptions);
    };

    const handleSubmit = () => {
        let score = 0;
        for (let i = 0; i < correctSequence.length; i++) {
            if (userSequence[i] && userSequence[i].id.includes(correctSequence[i].id)) {
                score++;
            }
        }
        addScore(score);
        onNext();
    };

    return (
        <div className="question-8">
            <div className="question-container">
                <h2>Pogledaj niz i zapamti ga:</h2>
                {showSequence ? (
                    <div className="sequence">
                        {correctSequence.map((item, index) => (
                            <img key={index} src={item.imgSrc} alt="cvijet" className="flower-image" />
                        ))}
                    </div>
                ) : (
                    <>
                        <h3>Prevuci elemente u odgovarajuće kutije:</h3>
                        <DndContext onDragEnd={handleDragEnd}>
                            <div className="droppable-area">
                                {userSequence.map((item, index) => (
                                    <DroppableBox key={index} id={`box-${index}`} droppedItem={item} />
                                ))}
                            </div>
                            <h3>Dostupni elementi:</h3>
                            <div id="options" className="draggable-options">
                                {availableOptions.map((item) => (
                                    <DraggableItem key={item.id} id={item.id} imgSrc={item.imgSrc} />
                                ))}
                            </div>
                        </DndContext>
                        
                        
                    </>
                )}
            </div>
            <div className={`${showSequence ? "display-none" : ""} submit-btn`} onClick={handleSubmit}>
                Potvrdi
            </div>
        </div>
    );
}

export default Question8;
