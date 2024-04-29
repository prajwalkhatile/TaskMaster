"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    discription: "",
  });

  // function to get todos data from database

  const [todoData, setTodoData] = useState([]);

  const fetchToDoData = async () => {
    const response = await axios.get("/api");
    setTodoData(response.data.todos);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });
    toast.success(response.data.msg);
    fetchToDoData();
  };

  const completeTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );
    toast.success(response.data.msg);
    fetchToDoData();
  };

  useEffect(() => {
    fetchToDoData();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("/api", formData);

      toast.success(response.data.msg);
      setFormData({
        title: "",
        discription: "",
      });

      await fetchToDoData();
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[45%] max-w-[600] mt-24 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.title}
        />
        <textarea
          name="discription"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.discription}
        ></textarea>

        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      {/* Table of Todo */}

      <div className="relative overflow-x-auto mt-24 w-[70%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  discription={item.discription}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
