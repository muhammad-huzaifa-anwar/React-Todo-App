import { useContext } from "react";
import { useState } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
import styles from "./AddTodo.module.css";

function AddTodo() {
  const { addNewItem } = useContext(TodoItemsContext);
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    if (todoName && dueDate) {
      addNewItem(todoName, dueDate);
      setDueDate("");
      setTodoName("");
    }
  };

  return (
    <div className={styles.addTodoContainer}>
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter Todo Here"
          value={todoName}
          onChange={handleNameChange}
          className={styles.input}
        />
        <input
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddButtonClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
