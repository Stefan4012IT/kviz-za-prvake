import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
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
        minHeight: "50px",
        minWidth: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div ref={setNodeRef} style={style} onDrop={onDrop} className="droppable-target">
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

    const [droppedItem, setDroppedItem] = useState(null);

    const handleDragEnd = ({ active, over }) => {
        if (over?.id === "droppable-target") {
            const draggedItem = options.find((option) => option.id === active.id);
            if (draggedItem) {
                setDroppedItem(draggedItem);
            }
        }
    };

    const handleSubmit = () => {
        if (droppedItem?.id === "najveca-zvezda") {
            addScore(1);
        }
        onNext();
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="question-container">
                <h2>Nastavi niz:</h2>
                <div className="sequence-container">
                    {sequence.map((item) => (
                        <div key={item.id} className="sequence-item">
                            {item.label}
                        </div>
                    ))}
                    <DroppableTarget id="droppable-target">
                        {droppedItem ? (
                            <div className="dropped-item">{droppedItem.label}</div>
                        ) : (
                            <span>?</span>
                        )}
                    </DroppableTarget>
                </div>
                <div className="drag-container">
                    {options.map((option) => (
                        <DraggableItem key={option.id} id={option.id} label={option.label} />
                    ))}
                </div>
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={!droppedItem}
                >
                    Dalje
                </button>
            </div>
        </DndContext>
    );
}

export default Question5;
