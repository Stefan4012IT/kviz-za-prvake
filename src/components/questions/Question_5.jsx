import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "../../styles/question-5.css";
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

function DroppableTarget({ id, children, onDrop }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
        border: isOver ? "2px solid #28a745" : "2px dashed #ccc",
    };

    return (
        <div ref={setNodeRef} style={style} className="droppable-target">
            {children}
        </div>
    );
}

function Question5({ onNext }) {
    const { addScore } = useScore();

    const options = [
        { id: "najveca-zvezda", label: "⭐ Najveća zvezda" },
        { id: "velika-zvezda", label: "⭐ Velika zvezda" },
    ];

    const sequence = [
        { id: "mala-zvezda", label: "⭐ Mala zvezdica" },
        { id: "malo-veca-zvezda", label: "⭐ Malo veća zvezda" },
        { id: "velika-zvezda", label: "⭐ Velika zvezda" },
    ];

    const [target, setTarget] = useState(null); // Čuva podatke o izabranoj zvezdi

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItem = options.find((option) => option.id === active.id);

        if (draggedItem && over.id === "droppable-target") {
            setTarget(draggedItem); // Postavi izabrani element
        }
    };

    const handleSubmit = () => {
        if (target?.id === "najveca-zvezda") {
            addScore(1); // Dodaj bod za tačan odgovor
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-container">
            <h2>Nastavi niz:</h2>
            <div className="sequence-container">
                {sequence.map((item) => (
                    <div key={item.id} className="sequence-item">
                        {item.label}
                    </div>
                ))}
                <DroppableTarget id="droppable-target">
                    {target && (
                        <div className="dropped-item">
                            {target.label}
                        </div>
                    )}
                </DroppableTarget>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="drag-container start-content">
                    {options.map((option) => (
                        <DraggableItem key={option.id} id={option.id} label={option.label} />
                    ))}
                </div>
            </DndContext>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!target} // Onemogućeno dok korisnik ne odabere opciju
            >
                Dalje
            </button>
        </div>
    );
}

export default Question5;
