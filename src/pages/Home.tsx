import React, { useState } from "react";
import { Checkbox, Button, Space, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Test 1", createdDate: "05/14", completed: false },
    { id: 2, title: "Test 2", completed: true }
  ]);
  const onChange = (e: any) => {
    console.log(`checked = ${e.task.checked}`);
  };
  const handleDeleteTask = (idToDelete: number) => {
    const updatedTasks = tasks.filter(task => task.id !== idToDelete);
    setTasks(updatedTasks);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [value, setValue] = useState("");

  function add() {
    const newTask = {
      id: tasks.length + 1,
      title: value,
      completed: false
    };
    console.log("new task", newTask);

    setTasks([...tasks, newTask]);
    setValue("");
  }
  return (
    <div style={{ margin: 10 }}>
      <h1 style={{ textAlign: "center" }}>ToDo List</h1>

      <div>
        <input
          type="text"
          name="New Task"
          placeholder="Input Task"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button type="primary" style={{ margin: "10px 0px" }} onClick={add}>
          Add Task
        </Button>
      </div>

      <Space direction="vertical">
        {tasks.map(task => (
          <div>
            <Checkbox onChange={onChange} checked={task.completed}>
              {task.title}
            </Checkbox>
            <Button
              type="text"
              onClick={() => handleDeleteTask(task.id)}
              icon={<DeleteOutlined />}
            />
            <Button type="text" onClick={showModal} icon={<EditOutlined />} />

            <Modal
              title="Edit Task"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="id" />
              <Input placeholder="name" />
              <Input placeholder="created date" />
              <Input placeholder="modified date" />
            </Modal>
          </div>
        ))}
      </Space>
    </div>
  );
}
