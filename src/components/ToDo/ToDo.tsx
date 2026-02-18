import { useEffect, useMemo, useState } from "react";
import "./Todo.css";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

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
      : completedRaw === "true" // tolerate string "true"/"false"
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
    // ignore quota or serialization errors
  }
}

export default function Todo() {
  const [items, setItems] = useState<TodoItem[]>(() => loadTodos());
  const [input, setInput] = useState("");

  useEffect(() => {
    saveTodos(items);
  }, [items]);

  const remaining = useMemo(
    () => items.filter((i) => !i.completed).length,
    [items],
  );

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

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)),
    );
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearAll() {
    if (items.length === 0) return;
    // Optional confirm — comment out if you don't want a prompt
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

      <ul className="todo__list" role="list">
        {items.map((item) => (
          <li key={item.id} className="todo__item">
            <label className="todo__label">
              <input
                type="checkbox"
                className="todo__checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                aria-label={`Mark "${item.text}" as ${
                  item.completed ? "incomplete" : "complete"
                }`}
              />
              <span
                className={`todo__text ${
                  item.completed ? "todo__text--done" : ""
                }`}
              >
                {item.text}
              </span>
            </label>

            <button
              className="todo__delete btn-ghost"
              type="button"
              onClick={() => deleteItem(item.id)}
              aria-label={`Delete "${item.text}"`}
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

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
