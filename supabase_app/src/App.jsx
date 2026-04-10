import { useEffect, useState } from "react";
import "./App.css";
import supabase from '../supabase-client';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    consulta();
  }, []);

  const consulta = async () => {
    const { data, error } = await supabase.from("Reservas").select("*");
    console.log(data);
    if (error) {
      console.log("Error de conexion en consulta: ", error);
    } else {
      setTodoList(data);
    }
  };

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("Reservas").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setTodoList(data);
    }
  };
  const addTodo = async () => {
    const newTodoData = {
      reservation: newTodo,
      isReserved: true,
    };
    const { data, error } = await supabase
      .from("Reservas")
      .insert([newTodoData])
      .single();
    if (error) {
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };
  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("Reservas")
      .update({ isReserved: !isCompleted })
      .eq("id", id);
    if (error) {
      console.log("error toggling task: ", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isReserved: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }
  };
  const deleteTask = async (id) => {
    const { data, error } = await supabase
      .from("Reservas")
      .delete()
      .eq("id", id);
    if (error) {
      console.log("error deleting task: ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      {" "}
      <h1>Reservations list</h1>
      <div>
        <input
          type="text"
          placeholder="New Reservation..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}> Add Reservation</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <p> {todo.reservation}</p>
            <button onClick={() => completeTask(todo.id, todo.isReserved)}>
              {" "}
              {todo.isReserved ? "Undo" : "Complete Reservation"}
            </button>
            <button onClick={() => deleteTask(todo.id)}> Delete Reservation</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
