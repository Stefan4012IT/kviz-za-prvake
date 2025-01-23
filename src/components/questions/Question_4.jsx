import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import "../../styles/drag-and-drop.css";
import "../../styles/question-4.css";
import { useScore } from "../../context/ScoreContext";

function Question4({ onNext }) {
    const { addScore } = useScore();
    const [items, setItems] = useState([
        { id: "pismo", label: "📜 Pismo" },
        { id: "injekcija", label: "💉 Injekcija" },
        { id: "oklagija", label: "🍞 Oklagija" },
    ]);

    const [targets, setTargets] = useState([
        { id: "postar", label: "Poštar", correct: "pismo", droppedItem: null },
        { id: "medicinska-sestra", label: "Medicinska sestra", correct: "injekcija", droppedItem: null },
        { id: "pekar", label: "Pekar", correct: "oklagija", droppedItem: null },
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return; // Ako nema destinacije, ne radi ništa

        const draggedItem = items.find((item) => item.id === active.id) || 
                            targets.find((target) => target.droppedItem?.id === active.id)?.droppedItem;

        if (!draggedItem) return;

        // Ažuriraj stanje izvora i ciljeva
        let updatedItems = [...items];
        let updatedTargets = [...targets];

        // Ukloni predmet iz trenutne lokacije
        updatedItems = updatedItems.filter((item) => item.id !== draggedItem.id);
        updatedTargets = updatedTargets.map((target) => {
            if (target.droppedItem?.id === draggedItem.id) {
                return { ...target, droppedItem: null }; // Ukloni predmet iz ciljanog polja
            }
            return target;
        });

        // Dodaj predmet na novu lokaciju
        if (over.id === "items") {
            // Povratak u izvorno polje
            updatedItems.push(draggedItem);
        } else {
            // Prebacivanje u cilj
            updatedTargets = updatedTargets.map((target) => {
                if (target.id === over.id) {
                    // Ako cilj već ima predmet, vrati ga u izvorno polje
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
        <div className="question-container">
            <h2>Spoji predmete koje koriste ljudi na slici u svom poslu:</h2>
            <DragAndDropContext onDragEnd={handleDragEnd}>
                <div className="drag-container">
                    <div className="drag-items takeFrom">
                        {items.map((item) => (
                            <DraggableItem key={item.id} id={item.id} label={item.label} >
                                <div className="takeFrom">

                                </div>
                            </DraggableItem>
                        ))}
                    </div>
                    <div className="drag-targets">
                        {targets.map((target) => (
                            <DroppableTarget
                                key={target.id}
                                id={target.id}
                                label={target.label}
                            >
                                {target.droppedItem && (
                                    
                                    <DraggableItem
                                        id={target.droppedItem.id}
                                        label={target.droppedItem.label}
                                    >
                                        <div className="takeTo"></div>
                                    </DraggableItem>
                                )}
                            </DroppableTarget>
                        ))}
                    </div>
                </div>
            </DragAndDropContext>
            <button className="submit-btn" onClick={handleSubmit}>
                Dalje
            </button>
        </div>
    );
}

export default Question4;
