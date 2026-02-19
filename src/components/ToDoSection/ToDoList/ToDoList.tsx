import type { TodoItem } from "../../../types/toDoTypes";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";

export default function ToDoList({
  setItems,
  items,
}: {
  setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  items: TodoItem[];
}) {
  return (
    <ul className="todo__list" role="list">
      {items.map((item) => (
        <ToDoItem key={item.id} item={item} setItems={setItems} />
      ))}
    </ul>
  );
}
