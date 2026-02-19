import { useState } from "react";
import type { TodoItem } from "../../../types/toDoTypes";
import "./ToDoInput.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { addItem } from "../../../store/itemsSlice";

export default function ToDoInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  function handleAddItem() {
    const text = input.trim();
    if (!text) return;
    const newItem: TodoItem = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    dispatch(addItem(newItem));
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
          if (e.key === "Enter") handleAddItem();
        }}
        aria-label="New task"
      />
      <button className="todo__add btn" type="button" onClick={handleAddItem}>
        Add
      </button>
    </div>
  );
}
