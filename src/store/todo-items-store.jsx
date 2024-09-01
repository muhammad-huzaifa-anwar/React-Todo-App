import { useReducer, createContext } from "react";

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  editItem: () => {},
});

const todoItemsReducer = (currTodoItems, action) => {
  switch (action.type) {
    case "NEW_ITEM":
      return [
        ...currTodoItems,
        { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
      ];

    case "DELETE_ITEM":
      return currTodoItems.filter(
        (item) => item.name !== action.payload.itemName
      );

    case "EDIT_ITEM":
      return currTodoItems.map((item) =>
        item.name === action.payload.oldName
          ? { name: action.payload.newName, dueDate: action.payload.newDate }
          : item
      );

    default:
      return currTodoItems;
  }
};

const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  const addNewItem = (itemName, itemDueDate) => {
    dispatchTodoItems({
      type: "NEW_ITEM",
      payload: { itemName, itemDueDate },
    });
  };

  const deleteItem = (todoItemName) => {
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: { itemName: todoItemName },
    });
  };

  const editItem = (oldName, newName, newDate) => {
    dispatchTodoItems({
      type: "EDIT_ITEM",
      payload: { oldName, newName, newDate },
    });
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        addNewItem,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
