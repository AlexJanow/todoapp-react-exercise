import "./App.css";
import { useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  // RENDER LIST
  function renderTodoItems() {
    const liItems = todoItems.map((todoItem) => {
      return (
        <TodoItem
          key={todoItem}
          name={todoItem}
          onClick={handleClickTodo}
          // onDelete={onDeleteTodoItem}
        />
      );
    });
    return liItems;
  }

  function handleClickTodo(clickedTodo) {
    const newTodos = todoItems.filter((todoItem) => todoItem !== clickedTodo);
    setTodoItems(newTodos);
  }
  // function onDeleteTodoItem(clickedDelete) {

  // }

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
    return (
      <li className="liItem">
        <button className="TodoItem__delete" onClick={handleClick}>
          x
        </button>
        {name}
        <button className="TodoItem__toggle">done</button>
      </li>
    );
  }

  return (
    <div className="App">
      <header className="Header">
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
      </header>
      <ul>{renderTodoItems()}</ul>
    </div>
  );
}

export default App;
