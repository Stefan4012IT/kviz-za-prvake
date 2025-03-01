import React from "react";
import { DndContext, useDraggable, useDroppable, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";


// DraggableItem: Element koji može da se prevlači
export function DraggableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                opacity: isDragging ? 0.5 : 1,
            }}
            className="draggable-item"
            {...attributes}
            {...listeners}
        >
            {children} {/* Renderovanje sadržaja unutar DraggableItem */}
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
    // Omogućavamo prevlačenje mišem i dodirom (za mobilne uređaje)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,  // Prevlačenje se aktivira posle 100ms
                tolerance: 5 // Može se pomeriti 5px pre nego što se aktivira
            }
        })
    );
    return (
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            {children}
        </DndContext>
    );
}
