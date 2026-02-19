import { useEffect, useMemo, useState } from "react";
import "./ToDoSection.css";
import ToDoList from "./ToDoList/ToDoList";
import type { TodoItem } from "../../types/toDoTypes";
import ToDoInput from "./ToDoInput/ToDoInput";

const STORAGE_KEY = "todo_items_v1";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toTodoItem(value: unknown): TodoItem | null {
  if (!isObject(value)) return null;

  if (
    !("id" in value) ||
    !("text" in value) ||
    !("completed" in value) ||
    !("createdAt" in value)
  ) {
    return null;
  }

  const id = String((value as Record<string, unknown>).id);
  const text = String((value as Record<string, unknown>).text);

  const completedRaw = (value as Record<string, unknown>).completed;
  const completed =
    typeof completedRaw === "boolean"
      ? completedRaw
      : completedRaw === "true"
        ? true
        : completedRaw === "false"
          ? false
          : Boolean(completedRaw);

  const createdAtRaw = (value as Record<string, unknown>).createdAt;
  const createdAt =
    typeof createdAtRaw === "number" ? createdAtRaw : Number(createdAtRaw);

  if (!Number.isFinite(createdAt)) return null;

  return { id, text, completed, createdAt };
}

function loadTodos(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    const items: TodoItem[] = [];
    for (const entry of parsed) {
      const item = toTodoItem(entry);
      if (item) items.push(item);
    }
    return items;
  } catch {
    return [];
  }
}

function saveTodos(items: TodoItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    //
  }
}

export default function ToDoSection() {
  const [items, setItems] = useState<TodoItem[]>(() => loadTodos());

  useEffect(() => {
    saveTodos(items);
  }, [items]);

  const remaining = useMemo(
    () => items.filter((i) => !i.completed).length,
    [items],
  );

  function clearAll() {
    if (items.length === 0) return;
    if (!confirm("Clear all tasks?")) return;
    setItems([]);
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

      <ToDoInput setItems={setItems} />

      <ToDoList setItems={setItems} items={items} />
      <div className="todo__footer">
        <button
          className="todo__clear btn-ghost"
          type="button"
          onClick={clearAll}
          disabled={items.length === 0}
          title="Clear all"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
