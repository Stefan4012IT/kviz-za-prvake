import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useScore } from "../../context/ScoreContext";

function SortableItem({ id, label }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="draggable-item">
            {label}
        </div>
    );
}

function Question19({ onNext }) {
    const { addScore } = useScore();

    const correctOrder = ["mrav", "miš", "lisica", "pas", "noj", "slon"];
    const initialOrder = ["lisica", "noj", "miš", "slon", "mrav", "pas"];

    const [sequence, setSequence] = useState(initialOrder.map((id) => ({ id, label: getAnimalLabel(id) })));
    const [isAnswered, setIsAnswered] = useState(false);

    function getAnimalLabel(id) {
        const labels = {
            mrav: "🐜 Mrav",
            miš: "🐭 Miš",
            lisica: "🦊 Lisica",
            pas: "🐶 Pas",
            noj: "🦩 Noj",
            slon: "🐘 Slon",
        };
        return labels[id];
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = sequence.findIndex((item) => item.id === active.id);
            const newIndex = sequence.findIndex((item) => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                setSequence((prevSequence) => arrayMove(prevSequence, oldIndex, newIndex));
            }
        }
    };

    const handleSubmit = () => {
        const isCorrect =
            sequence.length === correctOrder.length &&
            sequence.every((item, index) => item.id === correctOrder[index]);

        if (isCorrect) {
            addScore(1);
        }

        setIsAnswered(true);
    };

    return (
        <div className="question-container">
            <h2>Poređaj životinje od najmanje do najveće:</h2>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sequence.map((item) => item.id)} strategy={rectSortingStrategy}>
                    <div className="sortable-container">
                        {sequence.map((item) => (
                            <SortableItem key={item.id} id={item.id} label={item.label} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            {!isAnswered && (
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={sequence.length !== correctOrder.length}
                >
                    Potvrdi
                </button>
            )}
            {isAnswered && (
                <button className="next-btn" onClick={onNext}>
                    Dalje
                </button>
            )}
        </div>
    );
}

export default Question19;
