import React, { useState } from "react";
import { DragAndDropContext, DraggableItem, DroppableTarget } from "../DragAndDrop";
import "../../styles/drag-and-drop.css";
import { useScore } from "../../context/ScoreContext";

function Question6({ onNext }) {
    const { addScore } = useScore();

    const [items, setItems] = useState([
        { id: "veliki-kvadrat", label: "🟦 Veliki kvadrat" },
        { id: "veliki-trougao", label: "🔺 Veliki trougao" },
        { id: "mali-kvadratic", label: "⬛ Mali kvadratić" },
        { id: "mali-pravougaonik", label: "▭ Mali pravougaonik" },
    ]);

    const [targets, setTargets] = useState({
        roof: { id: "roof", label: "Krov", correct: ["veliki-trougao"], items: [] },
        base: {
            id: "base",
            label: "Kuća (baza)",
            correct: ["veliki-kvadrat"],
            items: [],
            subTargets: {
                door: { id: "door", label: "Vrata", correct: ["mali-pravougaonik"], items: [] },
                leftWindow: { id: "left-window", label: "Prozor levo", correct: ["mali-kvadratic"], items: [] },
                rightWindow: { id: "right-window", label: "Prozor desno", correct: ["mali-kvadratic"], items: [] },
            },
        },
    });

    const isBaseSet = targets.base.items.some((item) => item.id === "veliki-kvadrat");

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const draggedItem = items.find((item) => item.id === active.id) || 
                            targets.roof.items.find((i) => i.id === active.id) ||
                            Object.values(targets.base.subTargets)
                                .flatMap((subTarget) => subTarget.items)
                                .find((i) => i.id === active.id);

        if (!draggedItem) return;

        // Uklanjanje iz trenutne lokacije
        const updatedItems = items.filter((item) => item.id !== draggedItem.id);
        const updatedTargets = { ...targets };

        updatedTargets.roof.items = updatedTargets.roof.items.filter((i) => i.id !== draggedItem.id);
        Object.values(updatedTargets.base.subTargets).forEach((subTarget) => {
            subTarget.items = subTarget.items.filter((i) => i.id !== draggedItem.id);
        });

        // Dodavanje u novu lokaciju
        if (over.id === "items") {
            updatedItems.push(draggedItem);
        } else if (over.id === "roof" && draggedItem.id === "veliki-trougao") {
            updatedTargets.roof.items.push(draggedItem);
        } else if (over.id === "base" && draggedItem.id === "veliki-kvadrat") {
            updatedTargets.base.items.push(draggedItem);
        } else if (isBaseSet && updatedTargets.base.subTargets[over.id]) {
            // Dodavanje samo u odgovarajuća pod-polja
            if (
                (over.id === "door" && draggedItem.id === "mali-pravougaonik") ||
                ((over.id === "left-window" || over.id === "right-window") && draggedItem.id === "mali-kvadratic")
            ) {
                updatedTargets.base.subTargets[over.id].items.push(draggedItem);
            }
        }

        setItems(updatedItems);
        setTargets(updatedTargets);
    };

    const handleSubmit = () => {
        let scoreToAdd = 0;

        // Bodovanje za bazu i krov
        Object.values(targets).forEach((target) => {
            if (target.correct && target.correct.includes(target.items[0]?.id)) {
                scoreToAdd++;
            }
        });

        // Bodovanje za vrata i prozore
        Object.values(targets.base.subTargets).forEach((subTarget) => {
            if (subTarget.correct.includes(subTarget.items[0]?.id)) {
                scoreToAdd++;
            }
        });

        addScore(scoreToAdd);
        onNext();
    };

    return (
        <div className="question-container">
            <h2>Napravi kućicu od datih oblika:</h2>
            <p>🟦 Veliki kvadrat, 🔺 Veliki trougao, ⬛ Mali kvadratić, ▭ Mali pravougaonik</p>
            <DragAndDropContext onDragEnd={handleDragEnd}>
                <div className="drag-container">
                    <div className="drag-items">
                        {items.map((item) => (
                            <DraggableItem key={item.id} id={item.id} label={item.label} />
                        ))}
                    </div>
                    <div className="drag-targets">
                        <DroppableTarget id="roof" label="Krov">
                            {targets.roof.items.map((item) => (
                                <DraggableItem key={item.id} id={item.id} label={item.label} />
                            ))}
                        </DroppableTarget>
                        <DroppableTarget id="base" label="Kuća (baza)" className={isBaseSet ? "base-set" : ""}>
                            {targets.base.items.map((item) => (
                                <DraggableItem
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    style={{ display: "none" }}
                                />
                            ))}
                            {isBaseSet && (
                                <div className="base-details">
                                    <DroppableTarget id="left-window" label="Prozor levo">
                                        {targets.base.subTargets.leftWindow.items.map((item) => (
                                            <DraggableItem key={item.id} id={item.id} label={item.label} />
                                        ))}
                                    </DroppableTarget>
                                    <DroppableTarget id="door" label="Vrata">
                                        {targets.base.subTargets.door.items.map((item) => (
                                            <DraggableItem key={item.id} id={item.id} label={item.label} />
                                        ))}
                                    </DroppableTarget>
                                    <DroppableTarget id="right-window" label="Prozor desno">
                                        {targets.base.subTargets.rightWindow.items.map((item) => (
                                            <DraggableItem key={item.id} id={item.id} label={item.label} />
                                        ))}
                                    </DroppableTarget>
                                </div>
                            )}
                        </DroppableTarget>
                    </div>
                </div>
            </DragAndDropContext>
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!isBaseSet}
            >
                Dalje
            </button>
        </div>
    );
}

export default Question6;
