import { useState } from "react";
import type { TodoItem } from "../../../types/toDoTypes";
import "./ToDoInput.css";

export default function ToDoInput({
  setItems,
}: {
  setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) {
  const [input, setInput] = useState("");

  function addItem() {
    const text = input.trim();
    if (!text) return;
    const newItem: TodoItem = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
    setInput("");
  }

  return (
    <div className="todo__input-row">
      <input
        className="todo__input"
        type="text"
        value={input}
        placeholder="Add a new task…"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addItem();
        }}
        aria-label="New task"
      />
      <button className="todo__add btn" type="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
}
