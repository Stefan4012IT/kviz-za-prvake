import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = {
    ITEM: "item",
};

function DraggableItem({ label, value }) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemType.ITEM,
        item: { value },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: "10px",
                margin: "5px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "grab",
            }}
        >
            {label}
        </div>
    );
}

function DropTarget({ label, correct, onDrop }) {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: ItemType.ITEM,
        drop: (item) => onDrop(item.value, correct),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={dropRef}
            style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: isOver ? "#d4edda" : "#f8f9fa",
                border: "2px dashed #ccc",
                borderRadius: "5px",
                textAlign: "center",
                minHeight: "50px",
            }}
        >
            {label}
        </div>
    );
}

function DragAndDrop({ question, onNext }) {
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    const handleDrop = (itemValue, correctValue) => {
        if (itemValue === correctValue) {
            setScore((prev) => prev + 1);
        }
    };

    const handleSubmit = () => {
        setCompleted(true);
        onNext(score);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <h3>Predmeti:</h3>
                    {question.items.map((item) => (
                        <DraggableItem key={item.value} label={item.label} value={item.value} />
                    ))}
                </div>
                <div>
                    <h3>Ciljevi:</h3>
                    {question.targets.map((target) => (
                        <DropTarget
                            key={target.correct}
                            label={target.label}
                            correct={target.correct}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>
            </div>
            {!completed && (
                <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
                    Dalje
                </button>
            )}
            {completed && <p>Osvojeni poeni: {score}</p>}
        </div>
    );
}

export default DragAndDrop;