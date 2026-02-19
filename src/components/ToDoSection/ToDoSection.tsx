import { useMemo } from "react";
import "./ToDoSection.css";
import ToDoList from "./ToDoList/ToDoList";
import ToDoInput from "./ToDoInput/ToDoInput";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { clearAll } from "../../store/itemsSlice";

export default function ToDoSection() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items);

  const remaining = useMemo(
    () => items.filter((i) => !i.completed).length,
    [items],
  );

  function onClearAll() {
    if (items.length === 0) return;
    dispatch(clearAll());
  }

  return (
    <div className="todo">
      <div className="todo__header">
        <h2 className="todo__title">To‑Do</h2>
        <div className="todo__meta">
          {items.length === 0
            ? "No tasks"
            : `${remaining} remaining / ${items.length} total`}
        </div>
      </div>

      <ToDoInput />

      <ToDoList />
      <div className="todo__footer">
        <button
          className="todo__clear btn-ghost"
          type="button"
          onClick={onClearAll}
          disabled={items.length === 0}
          title="Clear all"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
