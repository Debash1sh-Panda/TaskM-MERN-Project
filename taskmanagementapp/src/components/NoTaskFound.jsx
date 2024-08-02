import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function NoTaskFound() {
  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        width: "72vw",
        margin: "0",
      }}
    >
      <div className="text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-[#48bbd2]">
            4<span className="text-[#dce5e7]">0</span>4
          </h1>
          <h3 className="mt-10">Task Not Found</h3>
          <p className="mt-10">
            "No tasks available yet. To add new tasks, click the 'Create Task'
            button. In the 'Create Task' section, you can enter a title and
            description for your new tasks. Once created, they will show up
            here"
          </p>
          <Link
            to="/task-dashboard/create-task"
            className="btn bg-[#54c4da] text-[#333334] hover:bg-[#2fdfdc] hover:text-slate-800 rounded-full px-6 flex items-center gap-2 mt-10"
          >
            <FaEdit />
            Create Task
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoTaskFound;
