import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import "../../styles/drag-and-drop.css";
import { useScore } from "../../context/ScoreContext";

function Question5({ onNext }) {
    const { addScore } = useScore();
    const [options] = useState([
        { id: "najveca-zvezda", label: "⭐ Najveća zvezda" },
        { id: "velika-zvezda", label: "⭐ Velika zvezda" },
    ]);

    const [target, setTarget] = useState({ id: "next-in-sequence", label: "Sledeća zvezda?", droppedItem: null });

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return; // Ako nema destinacije, ne radi ništa

        const draggedItem = options.find((option) => option.id === active.id);

        if (!draggedItem) return;

        // Ažuriraj ciljno polje
        setTarget((prevTarget) => ({
            ...prevTarget,
            droppedItem: draggedItem, // Postavi izabranu zvezdu kao sledeću
        }));
    };

    const handleSubmit = () => {
        if (target.droppedItem?.id === "najveca-zvezda") {
            addScore(1); // Dodaj bod samo za tačan odgovor
        }
        onNext(); // Prelazak na sledeće pitanje
    };

    return (
        <div className="question-container">
            <h2>Nastavi niz:</h2>
            <p>1 mala zvezdica, 1 malo veća zvezda, 1 velika zvezda, ?</p>
            <DragAndDropContext onDragEnd={handleDragEnd}>
                <div className="drag-container">
                    <div className="drag-items">
                        {options.map((option) => (
                            <DraggableItem key={option.id} id={option.id} label={option.label} />
                        ))}
                    </div>
                    <div className="drag-targets">
                        <DroppableTarget
                            key={target.id}
                            id={target.id}
                            label={target.label}
                        >
                            {target.droppedItem && (
                                <DraggableItem
                                    id={target.droppedItem.id}
                                    label={target.droppedItem.label}
                                />
                            )}
                        </DroppableTarget>
                    </div>
                </div>
            </DragAndDropContext>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!target.droppedItem} // Onemogućeno dok korisnik ne odabere zvezdu
            >
                Dalje
            </button>
        </div>
    );
}

export default Question5;