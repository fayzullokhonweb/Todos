import { useRef } from "react";

import { useSelector } from "react-redux";
import { addTodo } from "./todoSlice";
import { removeTodo } from "./todoSlice";
import { changeStateTodo } from "./todoSlice";
import { useDispatch } from "react-redux";
import { BsFillSendFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todoState);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      const newTodo = {
        id: Math.random(),
        text: inputRef.current.value,
        completed: false,
      };
      dispatch(addTodo(newTodo));

      inputRef.current.value = "";
    } else {
      alert("Please enter iformation");
    }
  };

  return (
    <div className="pl-11 pt-11 w-full">
      <div className="flex max-w-3xl mx-auto flex-col items-end">
        <ul className="max-w-3xl mx-11">
          {todos &&
            todos.map((item) => {
              return (
                <li
                  className="p-3 rounded-xl flex items-center justify-between shadow-md"
                  style={{ opacity: item.completed ? "0.5" : "1" }}
                  key={item.id}
                >
                  <h2 className="text-xl font-mono font-semibold">
                    {item.text}
                  </h2>
                  <div className="flex gap-2  ml-16">
                    <button
                      onClick={() => dispatch(removeTodo(item.id))}
                      className=""
                    >
                      <MdDelete className="btn btn-primary btn-outline p-2 w-10 h-10" />
                    </button>
                    <button
                      onClick={() => dispatch(changeStateTodo(item.id))}
                      className=""
                    >
                      <MdDoneAll className="btn btn-primary btn-outline p-2 w-10 h-10" />
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="  fixed bottom-0 left-96 right-96 bg-inherit ">
        <form onSubmit={handleSubmit} className="w-ful">
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              ref={inputRef}
              placeholder="Add Text :"
              className="grow pr-5 pl-3"
            />
            <button className="">
              <BsFillSendFill className="w-5 h-5" />
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default App;
