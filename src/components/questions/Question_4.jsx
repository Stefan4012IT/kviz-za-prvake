import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import { useScore } from "../../context/ScoreContext";

function Question4({ onNext }) {
    const { addScore } = useScore();
    const [items, setItems] = useState([
        { id: "oklagija", imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_oklagija.png" },
        { id: "injekcija", imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_injekcija.png" },
        { id: "pismo", imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_pismo.png" },
        
        
    ]);

    const [targets, setTargets] = useState([
        { id: "postar", correct: "pismo", droppedItem: null, imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_postar.png" },
        { id: "medicinska-sestra", correct: "injekcija", droppedItem: null, imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_medicinskaSestra.png" },
        { id: "pekar", correct: "oklagija", droppedItem: null, imgSrc: process.env.PUBLIC_URL + "/img/question_4/kviz_kuvar.png" },
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const draggedItem = items.find((item) => item.id === active.id) ||
                            targets.find((target) => target.droppedItem?.id === active.id)?.droppedItem;

        if (!draggedItem) return;

        let updatedItems = [...items];
        let updatedTargets = [...targets];

        updatedItems = updatedItems.filter((item) => item.id !== draggedItem.id);
        updatedTargets = updatedTargets.map((target) => {
            if (target.droppedItem?.id === draggedItem.id) {
                return { ...target, droppedItem: null };
            }
            return target;
        });

        if (over.id === "items") {
            updatedItems.push(draggedItem);
        } else {
            updatedTargets = updatedTargets.map((target) => {
                if (target.id === over.id) {
                    if (target.droppedItem) {
                        updatedItems.push(target.droppedItem);
                    }
                    return { ...target, droppedItem: draggedItem };
                }
                return target;
            });
        }

        setItems(updatedItems);
        setTargets(updatedTargets);
    };

    const handleSubmit = () => {
        let scoreToAdd = 0;
        targets.forEach((target) => {
            if (target.droppedItem?.id === target.correct) {
                scoreToAdd++;
            }
        });
        addScore(scoreToAdd);
        onNext();
    };

    return (
        <div className="question-4">
            <div className="question-container">
                <h2>Spoji predmete koje koriste ljudi na slici u svom poslu:</h2>
                <DragAndDropContext onDragEnd={handleDragEnd}>
                    <div className="drag-container">
                        <div className="drag-items">
                            {items.map((item) => (
                                <DraggableItem key={item.id} id={item.id}>
                                    <img src={item.imgSrc} alt="item" className="item-image" />
                                </DraggableItem>
                            ))}
                        </div>
                        <div className="drag-targets">
                            {targets.map((target) => (
                                <DroppableTarget key={target.id} id={target.id}>
                                    <img src={target.imgSrc} alt="target" className="target-image" />
                                    {target.droppedItem && (
                                        <DraggableItem id={target.droppedItem.id}>
                                            <img src={target.droppedItem.imgSrc} alt="item" className="item-image" />
                                        </DraggableItem>
                                    )}
                                </DroppableTarget>
                            ))}
                        </div>
                    </div>
                </DragAndDropContext>
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
                Dalje
            </div>
        </div>
    );
}

export default Question4;
