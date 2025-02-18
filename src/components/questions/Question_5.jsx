import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
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
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <img src={imgSrc} alt="Draggable Item" className="item-image" />
        </div>
    );
}

function DroppableTarget({ id, droppedItem }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        border: isOver ? "1px solid #fefefe" : "2px dashed #fefefe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
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
    const [currentTask, setCurrentTask] = useState(1);
    const [droppedItem, setDroppedItem] = useState(null);

    const options = {
        task1: [
            {
                id: "najveca-zvezda",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaNajveca.png",
            },
            {
                id: "mala-zvezda",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_zvezdaMala.png",
            },
        ],
        task2: [
            {
                id: "manji-romb",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_rombMaloVeci.png", // Zameni sa rombom
            },
            {
                id: "jos-manji-romb",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_rombMali.png", // Zameni sa rombom
            },
        ],
    };

    const sequence = {
        task1: [
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
            {
                id: "placeholder",
                imgSrc: "", // Placeholder polje za drop
            }
        ],
        task2: [
            {
                id: "najveci-romb",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_rombNajveci.png", // Zameni sa rombom
            },
            {
                id: "veci-romb",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_rombVeliki.png", // Zameni sa rombom
            },
            {
                id: "placeholder",
                imgSrc: "", // Placeholder polje za drop
            },
            {
                id: "najmanji-romb",
                imgSrc: process.env.PUBLIC_URL + "/img/question_5/kviz_rombMali.png", // Zameni sa rombom
            },
        ],
    };

    const handleDragEnd = ({ active, over }) => {
        if (over?.id === "droppable-target") {
            const draggedOption = options[currentTask === 1 ? "task1" : "task2"].find(
                (option) => option.id === active.id
            );
            if (draggedOption) {
                setDroppedItem(draggedOption);
            }
        }
    };

    const handleSubmit = () => {
        if (
            (currentTask === 1 && droppedItem?.id === "najveca-zvezda") ||
            (currentTask === 2 && droppedItem?.id === "manji-romb")
        ) {
            addScore(1);
        }
        if (currentTask === 1) {
            setCurrentTask(2);
            setDroppedItem(null);
        } else {
            onNext();
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        })
    );

    return (
        <div className="question-5">
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="question-container">
                    <h2>{currentTask === 1 ? "Nastavi niz:" : "Poređaj rombove:"}</h2>
                    <div className="sequence-container">
                        {sequence[currentTask === 1 ? "task1" : "task2"].map((item, index) => (
                            <div key={index} className="sequence-item">
                                {item.id === "placeholder" ? (
                                    <DroppableTarget id="droppable-target" droppedItem={droppedItem} />
                                ) : (
                                    <img src={item.imgSrc} alt="Sequence Item" className="item-image" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="drag-container">
                        {options[currentTask === 1 ? "task1" : "task2"].map((option) => (
                            <DraggableItem key={option.id} id={option.id} imgSrc={option.imgSrc} />
                        ))}
                    </div>
                    <div className="submit-btn" onClick={handleSubmit}>
                        {currentTask === 1 ? "Sledeće" : "Dalje"}
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default Question5;
