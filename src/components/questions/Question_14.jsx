import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import "../../styles/question-14.css";
import { useScore } from "../../context/ScoreContext";

function Question14({ onNext }) {
    const { addScore } = useScore();

    const generateBlocks = () => {
        const yellowBlocks = Array.from({ length: 8 }, (_, index) => ({
            id: `yellow-${index}`,
            label: "🟨 Žuta kocka",
            color: "yellow",
        }));
        const redBlocks = Array.from({ length: 5 }, (_, index) => ({
            id: `red-${index}`,
            label: "🟥 Crvena kocka",
            color: "red",
        }));
        return [...yellowBlocks, ...redBlocks];
    };

    const [availableBlocks, setAvailableBlocks] = useState(generateBlocks());
    const [sequence, setSequence] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    const correctSequence = [
        ...Array(6).fill("yellow"),
        ...Array(2).fill("red"),
    ];

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItem = availableBlocks.find((block) => block.id === active.id) || sequence.find((block) => block.id === active.id);

        if (!draggedItem) return;

        if (over.id === "sequence" && sequence.length < 8) {
            // Dodavanje u redosled
            setSequence([...sequence, draggedItem]);
            setAvailableBlocks(availableBlocks.filter((block) => block.id !== active.id));
        } else if (over.id === "available") {
            // Vraćanje nazad
            setAvailableBlocks([...availableBlocks, draggedItem]);
            setSequence(sequence.filter((block) => block.id !== active.id));
        }
    };

    const handleSubmit = () => {
        let score = 1;
        addScore(score);
        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Poređaj 6 žutih kocki i 2 crvene:</h2>
            <DragAndDropContext onDragEnd={handleDragEnd}>
                <h3>Slobodne kocke:</h3>
                <DroppableTarget id="available" label="Slobodne kocke">
                    {availableBlocks.map((block) => (
                        <DraggableItem key={block.id} id={block.id} label={block.label} />
                    ))}
                </DroppableTarget>
                <h3>Tvoj redosled:</h3>
                <DroppableTarget id="sequence" label="Redosled">
                    {sequence.map((block) => (
                        <DraggableItem key={block.id} id={block.id} label={block.label} />
                    ))}
                </DroppableTarget>
            </DragAndDropContext>
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={sequence.length !== 8}
                >
                    Potvrdi
                </button>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question14;
