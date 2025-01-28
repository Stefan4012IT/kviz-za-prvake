import React, { useState } from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import "../../styles/question-6.scss";
import { useScore } from "../../context/ScoreContext";

function DraggableItem({ id, className }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                opacity: isDragging ? 0.5 : 1,
            }}
            className={`draggable-item ${className}`} // Dodavanje klase iz SCSS-a
            {...attributes}
            {...listeners}
        ></div>
    );
}

function DroppableTarget({ id, children, className }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`${className} ${isOver ? "droppable-over" : ""}`} // Dodavanje klase za aktivno polje
        >
            {children}
        </div>
    );
}

function Question6({ onNext }) {
    const { addScore } = useScore();
    const [targets, setTargets] = useState({
        roof: [],
        base: [],
        leftWindow: [],
        rightWindow: [],
        door: [],
    });

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const sourceId = active.id;
        const targetId = over.id;

        setTargets((prev) => {
            const updated = { ...prev };

            // Uklanjanje iz svih ciljeva
            for (const key in updated) {
                updated[key] = updated[key].filter((item) => item !== sourceId);
            }

            // Dodavanje u novi cilj
            if (updated[targetId]) {
                updated[targetId].push(sourceId);
            }

            console.log("Updated targets:", updated); // Log za proveru
            return updated;
        });
    };

    const calculateScore = () => {
        let score = 0;

        if (targets.roof.includes("big-triangle")) score++;
        if (targets.base.includes("big-square")) score++;
        if (targets.leftWindow.includes("small-square")) score++;
        if (targets.rightWindow.includes("small-square")) score++;
        if (targets.door.includes("small-rectangle")) score++;

        return score;
    };

    const handleNext = () => {
        const score = calculateScore();
        addScore(score);
        onNext();
    };

    return (
        <div className="question-6">
            <div className="question-container">
                <h2>Složi kućicu:</h2>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="drag-container">
                        {/* Elementi za prevlačenje */}
                        <div className="drag-items">
                            {["big-square", "big-triangle", "small-square", "small-rectangle"].map((id) => {
                                const isInTargets = Object.values(targets).flat().includes(id);
                                if (!isInTargets) {
                                    return <DraggableItem key={id} id={id} className={id} />;
                                }
                                return null;
                            })}
                        </div>

                        {/* Ciljna polja */}
                        <div className="drag-targets">
                            <DroppableTarget id="roof" className="droppable roof">
                                {targets.roof.map((id) => (
                                    <DraggableItem key={id} id={id} className={id} />
                                ))}
                            </DroppableTarget>
                            <DroppableTarget id="base" className="droppable base">
                                {targets.base.map((id) => (
                                    <DraggableItem key={id} id={id}  />
                                ))}
                                {targets.base.includes("big-square") && (
                                    <div className="big-square">
                                        <DroppableTarget id="leftWindow" className="window left-window">
                                            {targets.leftWindow.map((id) => (
                                                <DraggableItem key={id} id={id} className={id} />
                                            ))}
                                        </DroppableTarget>
                                        <DroppableTarget id="door" className="door">
                                            {targets.door.map((id) => (
                                                <DraggableItem key={id} id={id} className={id} />
                                            ))}
                                        </DroppableTarget>
                                        <DroppableTarget id="rightWindow" className="window right-window">
                                            {targets.rightWindow.map((id) => (
                                                <DraggableItem key={id} id={id} className={id} />
                                            ))}
                                        </DroppableTarget>
                                    </div>
                                )}
                            </DroppableTarget>
                        </div>
                    </div>
                </DndContext>
                <button className="submit-btn" onClick={handleNext}>
                    Dalje
                </button>
            </div>
        </div>
        
    );
}

export default Question6;
