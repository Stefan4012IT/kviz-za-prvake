import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "../../styles/question-8.css";
import { useScore } from "../../context/ScoreContext";

function DraggableItem({ id, label }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="draggable-item">
            {label}
        </div>
    );
}

function DroppableBox({ id, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
    };

    return (
        <div ref={setNodeRef} className="droppable-box" style={style}>
            {children}
        </div>
    );
}

function Question8({ onNext }) {
    const { addScore } = useScore();
    const [showSequence, setShowSequence] = useState(true);
    const [userSequence, setUserSequence] = useState([null, null, null, null]);
    const [availableOptions, setAvailableOptions] = useState([
        { id: "item-1", label: "🌹" },
        { id: "item-2", label: "🌼" },
        { id: "item-3", label: "🔵" },
        { id: "item-4", label: "🌼" },
        { id: "item-5", label: "🌺" },
        { id: "item-6", label: "🔵" },
    ]);
    const [isAnswered, setIsAnswered] = useState(false);

    const correctSequence = [
        { id: "item-1", label: "🌹" },
        { id: "item-2", label: "🌼" },
        { id: "item-3", label: "🔵" },
        { id: "item-4", label: "🌼" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setShowSequence(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        if (over.id.startsWith("box")) {
            // Prebacivanje elementa u polje
            const boxIndex = parseInt(over.id.replace("box-", ""), 10);
            const draggedItem = availableOptions.find((item) => item.id === active.id);

            if (draggedItem) {
                const updatedSequence = [...userSequence];
                const updatedOptions = availableOptions.filter((item) => item.id !== active.id);

                // Ako već postoji element u tom polju, vrati ga nazad u opcije
                if (updatedSequence[boxIndex]) {
                    updatedOptions.push(updatedSequence[boxIndex]);
                }

                updatedSequence[boxIndex] = draggedItem;

                setUserSequence(updatedSequence);
                setAvailableOptions(updatedOptions);
            }
        } else if (over.id === "options") {
            // Vraćanje elementa nazad u opcije
            const draggedItem = userSequence.find((item) => item && item.id === active.id);

            if (draggedItem) {
                const updatedOptions = [...availableOptions, draggedItem];
                const updatedSequence = userSequence.map((item) =>
                    item && item.id === active.id ? null : item
                );

                setUserSequence(updatedSequence);
                setAvailableOptions(updatedOptions);
            }
        }
    };

    const handleSubmit = () => {
        let score = 0;
        for (let i = 0; i < correctSequence.length; i++) {
            if (userSequence[i]?.label === correctSequence[i].label) {
                score++;
            }
        }
        addScore(score);
        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Pogledaj niz i zapamti ga:</h2>
            {showSequence ? (
                <div className="sequence">
                    {correctSequence.map((item, index) => (
                        <span key={index} className="sequence-item">
                            {item.label}
                        </span>
                    ))}
                </div>
            ) : (
                <div>
                    <h3>Prevuci elemente u odgovarajuće kutije:</h3>
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className="droppable-area">
                            {userSequence.map((item, index) => (
                                <DroppableBox key={index} id={`box-${index}`}>
                                    {item && <DraggableItem id={item.id} label={item.label} />}
                                </DroppableBox>
                            ))}
                        </div>
                        <h3>Dostupni elementi:</h3>
                        <div id="options" className="draggable-options">
                            {availableOptions.map((item) => (
                                <DraggableItem key={item.id} id={item.id} label={item.label} />
                            ))}
                        </div>
                    </DndContext>
                    {userSequence.every((item) => item !== null) && !isAnswered && (
                        <button className="submit-btn" onClick={handleSubmit}>
                            Potvrdi
                        </button>
                    )}
                </div>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question8;
