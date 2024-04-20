const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//delete task
const removeTask=(id)=>{
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem("tasks",tasks));
    }
    tasks=tasks.filter(task=>{
        return task.id !== +id;
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    getTasks();
}
//get tasks
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //display to DOM
  let output;
  const allTasks = tasks.map((task) => {
    return `<li id="item">
        <span>${task.title}</span>
        <button onclick="removeTask('${task.id}')" id="delete">X</button>
      </li>`;
  });
  output = allTasks.join("");
  outputEl.innerHTML = output;
};
getTasks();

//add task and save into local storage
const addTask = (e) => {
  e.preventDefault(); //prevent browser refresh on add task
  if (inputEl.value === "") {
    alert("Please enter a Task");
  }

  //get item
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.unshift({ id: Date.now(), title: task });
    //save to loclstorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //empty input
    inputEl.value = "";
  }
  getTasks();
};
form.addEventListener("submit", addTask);
