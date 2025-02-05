import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useScore } from "../../context/ScoreContext";
import "../../styles/question-5.scss";

function DraggableItem({ id, imgSrc }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`draggable-item ${isDragging ? "dragging" : ""}`}
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
            }}
        >
            <img src={imgSrc} alt="Draggable Item" className="item-image" />
        </div>
    );
}

function DroppableTarget({ id, droppedItem }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
        border: isOver ? "2px solid #28a745" : "2px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
    };

    return (
        <div ref={setNodeRef} style={style} className="droppable-target">
            {droppedItem ? (
                <img
                    src={droppedItem.imgSrc}
                    alt="Dropped Item"
                    className="dropped-item-image"
                />
            ) : (
                <span>?</span>
            )}
        </div>
    );
}

function Question5({ onNext }) {
    const { addScore } = useScore();

    const options = [
        {
            id: "najveca-zvezda",
            imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaNajveca.png",
        },
        {
            id: "mala-zvezda",
            imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaMala.png",
        },
    ];

    const sequence = [
        {
            id: "mala-zvezda",
            imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaMala.png",
        },
        {
            id: "malo-veca-zvezda",
            imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaMaloVeca.png",
        },
        {
            id: "velika-zvezda",
            imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaVelika.png",
        },
    ];

    const [droppedItem, setDroppedItem] = useState(null);

    const handleDragEnd = ({ active, over }) => {
        if (over?.id === "droppable-target") {
            const draggedOption = options.find((option) => option.id === active.id);
            if (draggedOption) {
                setDroppedItem(draggedOption);
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
        <div className="question-5">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="question-container">
                    <h2>Nastavi niz:</h2>
                    <div className="sequence-container">
                        {sequence.map((item) => (
                            <div key={item.id} className="sequence-item">
                                <img src={item.imgSrc} alt="Sequence Item" className="item-image" />
                            </div>
                        ))}
                        <DroppableTarget id="droppable-target" droppedItem={droppedItem} />
                    </div>
                    <div className="drag-container">
                        {options.map((option) => (
                            <DraggableItem key={option.id} id={option.id} imgSrc={option.imgSrc} />
                        ))}
                    </div>
                    <button className="submit-btn" onClick={handleSubmit}>
                        Dalje
                    </button>
                </div>
            </DndContext>
        </div>
    );
}

export default Question5;
