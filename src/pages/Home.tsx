import React, { useState } from "react";
import { Checkbox, Button, Space, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
const Home = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test 1",
      createdDate: "2023-03-20",
      modifiedDate: "2023-03-20",
      completed: false
    },
    {
      id: 2,
      title: "Test 2",
      createdDate: "2023-03-20",
      modifiedDate: "2023-03-21",
      completed: true
    }
  ]);

  const [updateText, setUpdateText] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setselectedTask] = useState<any>();
  const [isComplete, setIsComplete] = useState<boolean>();

  const handleDeleteTask = (idToDelete: number) => {
    const updatedTasks = tasks.filter(task => task.id !== idToDelete);
    setTasks(updatedTasks);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setselectedTask(undefined);
  };


  const handleOk = () => {
    if (selectedTask) {
      const index = selectedTask.id - 1;
      const updateTask = {...selectedTask, title:updateText === "" ? selectedTask.title : updateText, modifiedDate:moment().format("YYYY-MM-DD"),completed:isComplete === selectedTask.completed? selectedTask.completed : isComplete} 
        tasks[index] = updateTask;
        setUpdateText("");
        handleCancel();
    }
  };

  function add() {
    const newTask = {
      id: tasks.length + 1,
      title: value,
      completed: false,
      createdDate: moment().format("YYYY-MM-DD"),
      modifiedDate: moment().format("YYYY-MM-DD")
    };
    console.log("new task", newTask);

    setTasks([...tasks, newTask]);
    setValue("");
  }
  return (
    <div style={{backgroundColor: "lightblue", padding: 35}}>
    <div style={{ margin: 10 , justifyContent: "center", alignItems: "center"}}>
      <h1 style={{ textAlign: "center" }}>ToDo List</h1>
  <div>
      <Space direction="horizontal">
        <Input
        style={{width: 550}}
          type="text"
          name="New Task"
          placeholder="Input Task"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button type="primary" style={{ margin: "10px 0px" }} onClick={add}>
          Add Task
        </Button>
      </Space>
      </div>

      <Space direction="vertical">
        {tasks.map(task => (
          <div>
            <span style={task.completed ? {textDecoration:'line-through'} : {}} >
              {task.title}
            </span>
            <Button
              type="text"
              onClick={() => handleDeleteTask(task.id)}
              icon={<DeleteOutlined />}
            />
            <Button
              type="text"
              onClick={() => {
                setselectedTask(task);
                showModal();
              }}
              icon={<EditOutlined />}
            />
          </div>
        ))}
      </Space>
      {selectedTask && (
  <Modal
  title="Edit Task"
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
<label style={{ display: "block", marginBottom: 5 }}>ID:</label>
  <Input disabled placeholder="id" defaultValue={selectedTask?.id} />
  <label style={{ display: "block", marginBottom: 5 }}>Name:</label>
  <Input onChange={e => setUpdateText(e.target.value)} placeholder="name" defaultValue={selectedTask?.title} />
  <label style={{ display: "block", marginBottom: 5 }}>
  <Checkbox onChange={e => setIsComplete(e.target.checked)} defaultChecked={selectedTask?.completed}>
      Completed
  </Checkbox>

  </label>
  <label style={{ display: "block", marginBottom: 5 }}>
    Created Date:
  </label>

  <Input
    disabled
    placeholder="created date"
    defaultValue={selectedTask?.createdDate}
  />

  <label style={{ display: "block", marginBottom: 5 }}>
  Modified Date:
  </label>
  <Input
    disabled
    placeholder="modifiedDate"
    defaultValue={selectedTask?.modifiedDate}
  />
</Modal>
      )}
    
    </div></div>
  );
};

export default Home;
