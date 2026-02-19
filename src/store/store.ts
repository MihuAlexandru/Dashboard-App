import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import itemsReducer, {
  addItem,
  toggleCompleted,
  removeItem,
  clearAll,
  setAll,
  ITEMS_STORAGE_KEY,
} from "./itemsSlice";
import type { TodoItem } from "../types/toDoTypes";

function saveTodos(items: TodoItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch {
    //
  }
}

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addItem, toggleCompleted, removeItem, clearAll, setAll),
  effect: (_action, api) => {
    const state = api.getState() as { items: TodoItem[] };
    saveTodos(state.items);
  },
});

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },

  middleware: (getDefault) =>
    getDefault().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
