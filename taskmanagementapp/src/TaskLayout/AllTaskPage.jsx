import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaCircleXmark, FaFilter } from "react-icons/fa6";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import NoTaskFound from "../components/NoTaskFound";
import { RiEditCircleFill } from "react-icons/ri";
import { baseUrl } from "../urls";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState("all");

  useEffect(() => {
    // // Retrieve the tasks from localStorage
    // const getAllTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // setTasks(getAllTasks);
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/task/api/v/show-tasks`
        );
        if (response.data.success) {
          // console.log('Fetched tasks:', response.data.alltasks);
          setTasks(response.data.alltasks);
        } else {
          toast.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (task) => {
    // console.log(task)
    //   // Filter out the task to be deleted
    //   const updatedTasks = tasks.filter((_, i) => i !== index);

    //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    //   toast.success("Task Deleted Successfully", {
    //     autoClose: 1000,
    //   });
    //   setTasks(updatedTasks);
    try {
      const response = await axios.delete(
        `${baseUrl}/task/api/v/delete-tasks/${task._id}`
      );
      // console.log(response)
      if (response.data.success) {
        setTasks(tasks.filter((t) => t._id !== task._id));
        toast.success("Task Deleted Successfully", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleStatus = async (task) => {
    const newStatus = task.status === "done" ? "not done" : "done";

    try {
      const response = await axios.patch(
        `${baseUrl}/task/api/v/update-status/${task._id}`,
        { status: newStatus }
      );
      if (response.data.success) {
        const updatedTasks = tasks.map((t) => {
          if (t._id === task._id) {
            return { ...t, status: newStatus };
          }
          return t;
        });

        // console.log(updatedTasks);
        setTasks(updatedTasks);
        toast.success(
          `Task Marked as ${
            newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
          }`,
          {
            autoClose: 1500,
          }
        );
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
    // const updatedTasks = tasks.map((task, i) => {
    //   if (i === index) {
    //     return {
    //       ...task,
    //       status: task.status === "done" ? "not done" : "done",
    //     };
    //   }
    //   return task;
    // });

    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // const newStatus = updatedTasks[index].status;
    // toast.success(
    //   `Task Marked as ${
    //     newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
    //   }`,
    //   {
    //     autoClose: 1500,
    //   }
    // );
    // setTasks(updatedTasks);
  };

  const handleTaskFilter = (status) => {
    setTaskFilter(status);
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    return task.status === taskFilter;
  });

  return (
    <div className="task-list">
      <div className="navbar bg-base-300 rounded-box">
        <div className="flex-1 px-2 lg:flex-none">
          <p className="text-lg font-bold">
            Here Are Your<span className="text-[#48bbd2]"> #TASKS!</span>{" "}
          </p>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            <a
              className="btn btn-ghost rounded-btn hover:bg-[#6ae6e4] hover:text-slate-900 mr-2"
              href="/task-dashboard/create-task"
            >
              <FaEdit />
              Create Task
            </a>
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost rounded-btn text-[#48bbd2] hover:bg-[#6ae6e4] hover:text-slate-900 font-serif"
              >
                <FaFilter />
                Filter Task
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <a
                    href="#all"
                    className="hover:bg-[#c7f5f5] hover:text-slate-900"
                    onClick={() => handleTaskFilter("all")}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    href="#complete"
                    className="hover:bg-[#c7f5f5] hover:text-slate-900 md-2"
                    onClick={() => handleTaskFilter("done")}
                  >
                    Complete
                  </a>
                </li>
                <li>
                  <a
                    href="#not-complete"
                    className="hover:bg-[#c7f5f5] hover:text-slate-900"
                    onClick={() => handleTaskFilter("not done")}
                  >
                    Incomplete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-28 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task._id}
              className="relative w-52 h-52 p-3 border border-x-cyan-600 rounded shadow-lg"
            >
              <h3 className="text-[#48bbd2] font-semibold text-xl mb-2">
                {task.title}
              </h3>
              <p className="mt-2 font-sans text-blue-200">{task.description}</p>
              <button
                onClick={() => handleStatus(task)}
                className="absolute bottom-2 left-1 rounded-full text-2xl font-bold px-2 py-2"
              >
                {task.status === "done" ? (
                  <IoCheckmarkDoneCircleSharp
                    className="text-[#33a93b] hover:text-[#942626]"
                    title="mark as not done"
                  />
                ) : (
                  <FaCircleXmark
                    className="text-[#942626] hover:text-[#33a93b]"
                    title="mark as done"
                  />
                )}
              </button>
              <button className="absolute bottom-2 left-8 rounded-full text-2xl font-bold px-2 py-2 text-[#9bc1c1]" title="edit task">
                <RiEditCircleFill />
              </button>
              <button
                onClick={() => handleDelete(task)}
                className="absolute bottom-2 right-2 bg-[#54c4da] text-[#333334] hover:bg-[#364444] hover:text-red-400 rounded-sm font-serif px-1 py-1"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <NoTaskFound />
        )}
      </div>
    </div>
  );
}

export default TaskList;
