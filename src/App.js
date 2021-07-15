import "./App.css";
import { useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  function renderTodoItems() {
    const liItems = todoItems.map((todoItem) => {
      return (
        <TodoItem key={todoItem} name={todoItem} onClick={handleClickTodo} />
      );
    });
    return liItems;
  }

  function handleClickTodo(clickedTodo) {
    const newTodos = todoItems.filter((todoItem) => todoItem !== clickedTodo);
    setTodoItems(newTodos);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newTodoItem = form.todoItemName.value;

    const newTodoItems = [...todoItems, newTodoItem];
    setTodoItems(newTodoItems);
    form.reset();
  }

  function TodoItem({ name, onClick }) {
    function handleClick() {
      onClick(name);
    }
    return <li onClick={handleClick}>{name}</li>;
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add todo"
          name="todoItemName"
          id="todoItemName"
          required
        />
        <button type="submit"> Add</button>
      </form>
      <ul>{renderTodoItems()}</ul>
    </div>
  );
}

export default App;
