import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import "../../styles/question-6.css";
import { useScore } from "../../context/ScoreContext";

function Question6({ onNext }) {
    const { addScore } = useScore();

    const [items, setItems] = useState([
        { id: "veliki-kvadrat", label: "🟦 Veliki kvadrat" },
        { id: "veliki-trougao", label: "🔺 Veliki trougao" },
        { id: "mali-kvadratic", label: "⬛ Mali kvadratić" },
        { id: "mali-pravougaonik", label: "▭ Mali pravougaonik" },
    ]);

    const [base, setBase] = useState({
        roof: { id: "roof", correct: ["veliki-trougao"], items: [] },
        main: { id: "main", hasBigSquare: false, items: [] }, // Veliki kvadrat i sub-targets
        isBaseEnabled: true, // Kontrolišemo da li je `base` još uvek droppable
    });

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedItem = items.find((item) => item.id === active.id);

        if (!draggedItem) return;

        const updatedItems = items.filter((item) => item.id !== active.id);
        const updatedBase = { ...base };

        // Ako je veliki kvadrat prebačen u bazu
        if (over.id === "main" && draggedItem.id === "veliki-kvadrat") {
            updatedBase.main.hasBigSquare = true;
            updatedBase.isBaseEnabled = false; // Onemogućavamo drop na `base`
        }

        // Ako se vrata ili prozori prebacuju u veliki kvadrat
        if (over.id === "big-square" && ["mali-pravougaonik", "mali-kvadratic"].includes(draggedItem.id)) {
            updatedBase.main.items.push(draggedItem);
        }

        setItems(updatedItems);
        setBase(updatedBase);
    };

    const handleSubmit = () => {
        let scoreToAdd = 0;

        // Proveri tačnost krova
        if (base.roof.items.length === 1 && base.roof.items[0].id === "veliki-trougao") {
            scoreToAdd++;
        }

        // Proveri tačnost sub-targetova u velikom kvadratu
        base.main.items.forEach((item) => {
            if (item.id === "mali-pravougaonik" || item.id === "mali-kvadratic") {
                scoreToAdd++;
            }
        });

        addScore(scoreToAdd);
        onNext();
    };

    return (
        <div className="question-container">
            <h2>Napravi kućicu od datih oblika:</h2>
            <DragAndDropContext onDragEnd={handleDragEnd}>
                <div className="drag-container">
                    <div className="drag-items">
                        {items.map((item) => (
                            <DraggableItem key={item.id} id={item.id} label={item.label} />
                        ))}
                    </div>
                    <div className="drag-targets">
                        <DroppableTarget id="roof" className="droppable roof">
                            {base.roof.items.map((item) => (
                                <DraggableItem key={item.id} id={item.id} label={item.label} />
                            ))}
                        </DroppableTarget>
                        {/* Onemogućavanje `base` kao droppable nakon što Veliki Kvadrat bude prebačen */}
                        {base.isBaseEnabled ? (
                            <DroppableTarget id="main" className="droppable base">
                                <span>Prevuci veliki kvadrat ovde</span>
                            </DroppableTarget>
                        ) : (
                            <div className="base-filled">
                                <DroppableTarget id="big-square" className="droppable big-square">
                                    {base.main.items.map((item) => (
                                        <DraggableItem key={item.id} id={item.id} label={item.label} />
                                    ))}
                                </DroppableTarget>
                            </div>
                        )}
                    </div>
                </div>
            </DragAndDropContext>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!base.main.hasBigSquare}
            >
                Dalje
            </button>
        </div>
    );
}

export default Question6;
