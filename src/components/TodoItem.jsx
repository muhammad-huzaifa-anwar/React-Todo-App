import React, { useContext, useState } from "react";
import { TodoItemsContext } from "../store/todo-items-store";
import styles from "./TodoItem.module.css";

function TodoItem({ todoName, todoDate }) {
  const { deleteItem, editItem } = useContext(TodoItemsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todoName);
  const [newDate, setNewDate] = useState(todoDate);

  const handleEdit = () => {
    if (newName && newDate) {
      editItem(todoName, newName, newDate);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.todoCard}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleEdit}
            >
              Save
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.todoContent}>
          <span className={styles.todoName}>{todoName}</span>
          <span className={styles.todoDate}>{todoDate}</span>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => deleteItem(todoName)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
