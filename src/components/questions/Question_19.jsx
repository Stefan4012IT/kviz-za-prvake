import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "../../styles/question-19.css";
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

function DroppableArea({ id, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
    };

    return (
        <div ref={setNodeRef} className="droppable-area" style={style}>
            {children}
        </div>
    );
}

function Question19({ onNext }) {
    const { addScore } = useScore();

    const correctOrder = ["mrav", "miš", "lisica", "pas", "noj", "slon"];
    const initialOrder = ["lisica", "noj", "miš", "slon", "mrav", "pas"];

    const [sequence, setSequence] = useState(initialOrder.map((id) => ({ id, label: getAnimalLabel(id) })));
    const [isAnswered, setIsAnswered] = useState(false);

    function getAnimalLabel(id) {
        const labels = {
            mrav: "🐜 Mrav",
            miš: "🐭 Miš",
            lisica: "🦊 Lisica",
            pas: "🐶 Pas",
            noj: "🦩 Noj",
            slon: "🐘 Slon",
        };
        return labels[id];
    }

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItemIndex = sequence.findIndex((item) => item.id === active.id);
        const droppedOnIndex = sequence.findIndex((item) => item.id === over.id);

        if (draggedItemIndex !== -1 && droppedOnIndex !== -1) {
            const updatedSequence = [...sequence];
            const [draggedItem] = updatedSequence.splice(draggedItemIndex, 1);
            updatedSequence.splice(droppedOnIndex, 0, draggedItem);
            setSequence(updatedSequence);
        }
    };

    const handleSubmit = () => {
        const isCorrect =
            sequence.length === correctOrder.length &&
            sequence.every((item, index) => item.id === correctOrder[index]);

        if (isCorrect) {
            addScore(1);
        }

        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Poređaj životinje od najmanje do najveće:</h2>
            <DndContext onDragEnd={handleDragEnd}>
                <DroppableArea id="sequence">
                    {sequence.map((item) => (
                        <DraggableItem key={item.id} id={item.id} label={item.label} />
                    ))}
                </DroppableArea>
            </DndContext>
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={sequence.length !== correctOrder.length}
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

export default Question19;
