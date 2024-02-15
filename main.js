let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let mode = 'all'
let filterList = []
let underLine = document.getElementById("under-line")
let menus = document.querySelectorAll(".task-tabs div")

menus.forEach((menu) =>
    menu.addEventListener("click", (e) => 
    indicator(e)
    ));

function indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = 
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}    

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    })
}

addButton.addEventListener("click",addTask)
document.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        addTask();
        taskInput.value ="";
    }
})

taskInput.addEventListener("click", function(){
    taskInput.value ="";
})

function addTask(){

    if(taskInput.value.trim() === "") { //빈칸시 alert 창
        alert("할일을 입력해 주세요");
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: mode === false
    }
    taskList.push(task);

    render();
    taskInput.value ="";
}

function render(){
    let list=[]
    
    if(mode ==="all"){
        list = taskList;
    }else if(mode ==="ing"||mode ==="done"){
        list = filterList;
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++){ 
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                    <img src="/images/check_btn_grey.jpg">
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <img src="/images/del_btn.jpg">
                </button>
            </div>
        </div>`
        } else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                    <img src="/images/check_btn.jpg">
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <img src="/images/del_btn.jpg">
                </button>
            </div>
        </div>`
        }       
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            // 진행중, 끝남일때도 delete 되게, 필터링된 리스트도 업데이트
            filterList = filterList.filter(task => task.id !== id);
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){        
        render();
    }else if(mode === "ing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);    
}
