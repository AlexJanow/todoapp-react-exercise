import "./App.css";
import { useState } from "react";

function App() {
  const seedTasks = [
    {
      task: "Do This!",
      status: "done",
    },
    {
      task: "Do That!",
      status: "pending",
    },
    {
      task: "Listen to Yoda!",
      status: "pending",
    },
    {
      task: "Don't walk the dark path!",
      status: "pending",
    },
    {
      task: "Get some sleep!",
      status: "pending",
    },
  ];

  const [todoItems, setTodoItems] = useState(seedTasks);

  // RENDER LIST
  function renderTodoItemsPending() {
    const liItems = todoItems
      .filter((todoItem) => {
        return todoItem.status === "pending";
      })
      .map((todoItem) => {
        return (
          <TodoItem
            key={todoItem.task}
            task={todoItem}
            name={todoItem.task}
            onRemove={handleClickTodo}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        );
      });
    return liItems;
  }
  function renderTodoItemsDone() {
    const liItems = todoItems
      .filter((todoItem) => {
        return todoItem.status === "done";
      })
      .map((todoItem) => {
        return (
          <TodoItem
            key={todoItem.task}
            task={todoItem}
            name={todoItem.task}
            onRemove={handleClickTodo}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        );
      });
    return liItems;
  }

  function handleClickTodo(clickedTodo) {
    const newTodos = todoItems.filter(
      (todoItem) => todoItem.task !== clickedTodo.task
    );
    setTodoItems(newTodos);
  }
  function handleToggle(clickedTodo) {
    const newTodos = todoItems.map((todoItem) => {
      if (todoItem.task === clickedTodo.task) {
        if (clickedTodo.status === "pending") {
          todoItem.status = "done";
        } else {
          todoItem.status = "pending";
        }
      }
      return todoItem;
    });
    setTodoItems(newTodos);
  }
  //test edit
  const [isActive, setActive] = useState("false");
  function handleEdit(clickedTodo) {
    setActive(!isActive);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newTodoItem = {
      task: form.todoItemName.value,
      status: "pending",
    };

    const newTodoItems = [...todoItems, newTodoItem];
    setTodoItems(newTodoItems);
    form.reset();
  }

  function TodoItem({ task, name, onRemove, onToggle, onEdit }) {
    function handleRemove() {
      onRemove(task);
    }
    function handleToggle() {
      onToggle(task);
    }
    function handleEdit() {
      onEdit(task);
    }
    return (
      <li className="liItem">
        <button className="TodoItem__delete" onClick={handleRemove}>
          x
        </button>
        {task.task}
        <button className="TodoItem__toggle" onClick={handleToggle}>
          {task.status === "pending" ? "done" : "do it "}
        </button>
        <button className="TodoItem__edit" onClick={handleEdit}>
          edit
        </button>
        <form className={`TodoItem__submitForm ${isActive ? "hidden" : null}`}>
          <input className="TodoItem__submitInput"></input>
          <button className="TodoItem__submitButton">save</button>
        </form>
      </li>
    );
  }

  function Header() {
    return (
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
    );
  }

  return (
    <div className="App">
      <Header />
      <ul>{renderTodoItemsPending()}</ul>
      <ul className="ItemsDone">{renderTodoItemsDone()}</ul>
    </div>
  );
}

export default App;
