import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "../styles/drag-and-drop.css";

// DraggableItem: Element koji može da se prevlači
export function DraggableItem({ id, label }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`drag-item ${isDragging ? "dragging" : ""}`}
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : "none",
            }}
        >
            {label}
        </div>
    );
}

// DroppableTarget: Ciljno polje gde se predmeti prevlače
export function DroppableTarget({ id, label, droppedItem, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`drag-target ${isOver ? "over" : ""}`}
        >
            <p>{label}</p>
            {children || (droppedItem && <div className="drag-item">{droppedItem.label}</div>)}
        </div>
    );
}

// DragAndDropContext: Kontekst za upravljanje događajima prevlačenja
export function DragAndDropContext({ children, onDragEnd }) {
    return (
        <DndContext onDragEnd={onDragEnd}>
            {children}
        </DndContext>
    );
}
