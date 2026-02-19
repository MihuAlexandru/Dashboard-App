import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoItem } from "../types/toDoTypes";

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

const initialState: TodoItem[] = loadTodos();

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TodoItem>) {
      state.unshift(action.payload);
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter((i) => i.id !== action.payload);
    },
    clearAll() {
      return [];
    },
    setAll(_state, action: PayloadAction<TodoItem[]>) {
      return action.payload;
    },
  },
});

export const { addItem, toggleCompleted, removeItem, clearAll, setAll } =
  itemsSlice.actions;
export default itemsSlice.reducer;

export const ITEMS_STORAGE_KEY = STORAGE_KEY;
export { toTodoItem };
