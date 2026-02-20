import { useDispatch } from "react-redux";
import type { TodoItem } from "../../../../types/toDoTypes";
import "./ToDoItem.css";
import type { AppDispatch } from "../../../../store/store";
import { removeItem, toggleCompleted } from "../../../../store/itemsSlice";

export default function ToDoItem({ item }: { item: TodoItem }) {
  const dispatch = useDispatch<AppDispatch>();

  function handleToggleItem(id: string) {
    dispatch(toggleCompleted(id));
  }

  function handleDeleteItem(id: string) {
    dispatch(removeItem(id));
  }

  return (
    <li key={item.id} className="todo__item">
      <label className="todo__label">
        <input
          type="checkbox"
          className="todo__checkbox"
          checked={item.completed}
          onChange={() => handleToggleItem(item.id)}
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
        onClick={() => handleDeleteItem(item.id)}
        aria-label={`Delete "${item.text}"`}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
