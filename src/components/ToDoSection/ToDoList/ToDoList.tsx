import { useSelector } from "react-redux";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import type { RootState } from "../../../store/store";

export default function ToDoList() {
  const items = useSelector((state: RootState) => state.items);

  return (
    <ul className="todo__list" role="list">
      {items.map((item) => (
        <ToDoItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
