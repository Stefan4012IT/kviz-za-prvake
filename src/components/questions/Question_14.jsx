import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useScore } from "../../context/ScoreContext";
import "../../styles/question-14.scss";

// Komponenta za prevlačive kocke
function DraggableBlock({ id, imgSrc }) {
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
            <img src={imgSrc} alt="kocka" className="block-image" />
        </div>
    );
}

// Komponenta za ciljana polja gde se kocke ređaju
function DroppableBox({ id, droppedItem }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className={`droppable-box ${isOver ? "hovered" : ""}`}>
            {droppedItem ? (
                <img src={droppedItem.imgSrc} alt="kocka" className="block-image" />
            ) : (
                <span>?</span>
            )}
        </div>
    );
}

function Question14({ onNext }) {
    const { addScore } = useScore();

    // Inicijalne kocke u ponudi
    const initialBlocks = [
        ...Array(8).fill(null).map((_, index) => ({
            id: `yellow-${index}`,
            imgSrc: process.env.PUBLIC_URL + "/img/question_14/kviz_zutaKocka.png",
            type: "yellow"
        })),
        ...Array(5).fill(null).map((_, index) => ({
            id: `red-${index}`,
            imgSrc: process.env.PUBLIC_URL + "/img/question_14/kviz_crvenaKocka.png",
            type: "red"
        })),
    ];

    const [availableBlocks, setAvailableBlocks] = useState(initialBlocks);
    const [userSequence, setUserSequence] = useState(Array(8).fill(null));

    // Tačan redosled za proveru (6 žutih + 2 crvene)
    const correctSequence = ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "red", "red"];

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;
        const draggedItem = availableBlocks.find((item) => item.id === active.id) ||
            userSequence.find((item) => item && item.id === active.id);

        if (!draggedItem) return;

        const targetIndex = over.id.startsWith("box-") ? parseInt(over.id.replace("box-", ""), 10) : null;
        const sourceIndex = userSequence.findIndex((item) => item && item.id === active.id);

        let updatedSequence = [...userSequence];
        let updatedAvailable = [...availableBlocks];

        if (targetIndex !== null) {
            // Ako u slotu već postoji kocka, vrati je u slobodne opcije
            if (updatedSequence[targetIndex]) {
                updatedAvailable.push(updatedSequence[targetIndex]);
            }
            updatedSequence[targetIndex] = draggedItem;
            updatedAvailable = updatedAvailable.filter((item) => item.id !== draggedItem.id);
        } else {
            // Vraćanje kocke u ponudu
            updatedAvailable.push(draggedItem);
            updatedSequence = updatedSequence.map((item) => (item && item.id === active.id ? null : item));
        }

        setUserSequence(updatedSequence);
        setAvailableBlocks(updatedAvailable);
    };

    const handleSubmit = () => {
        const userOrder = userSequence.map((block) => (block?.type === "yellow" ? "yellow" : "red"));
        const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctSequence);

        if (isCorrect) {
            addScore(1); // 1 bod ako je redosled tačan
        }

        onNext();
    };

    return (
        <div className="question-14">
            <div className="question-container">
                <h2>Poređaj 6 žutih kocki i 2 crvene:</h2>

                {/* Prikaz slobodnih kocki */}
                <p>Slobodne kocke:</p>
                <DndContext onDragEnd={handleDragEnd}>
                <div className="available-blocks">
                    {availableBlocks.map((block) => (
                        <DraggableBlock key={block.id} id={block.id} imgSrc={block.imgSrc} />
                    ))}
                </div>

                {/* Polja za ređanje kocki */}
                <p>Tvoj redosled:</p>
                
                    <div className="sequence-area">
                        {userSequence.map((item, index) => (
                            <DroppableBox key={index} id={`box-${index}`} droppedItem={item} />
                        ))}
                    </div>
                </DndContext>
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
                Potvrdi
            </div>
        </div>
    );
}

export default Question14;
