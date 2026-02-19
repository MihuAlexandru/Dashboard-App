import type { TodoItem } from "../../../types/toDoTypes";
import "./ToDoItem.css";

export default function ToDoItem({
  item,
  setItems,
}: {
  item: TodoItem;
  setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) {
  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)),
    );
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  return (
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
          className={`todo__text ${item.completed ? "todo__text--done" : ""}`}
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
  );
}
