/* Variables: */

let without = document.querySelector(".without")
let addDiv = document.getElementById("add-div")
let iconBtn = document.getElementById("btn-icon")
let task = document.getElementById("task")
let addBtn = document.getElementById("add-btn")
let days = document.getElementById("days")
let iconDiv = document.getElementById("icon-div")
let iconRow = document.querySelectorAll(".icon-row")
let myTasks = document.getElementById("my-tasks")
let container = document.querySelector(".container")
let plusBtn = document.getElementById("plus-button")
let defaultIcon = document.getElementById("default-icon")

const iconImages = document.querySelectorAll(".icon")
const oneDay = 1000*60*60*24 //One day in milliseconds
let tasksCounter = 0 // Counting tasks to assign them their ID
let array = JSON.parse(localStorage.getitem("Tasks")) || [] // Tasks array



/* Button to show menu to add tasks: */

plusBtn.addEventListener("click", () => {
    addDiv.classList.toggle("hidden")
})

/* Button to show icons dropdown menu: */

iconBtn.addEventListener("click", () => {
    iconDiv.classList.toggle("hidden")
    iconBtn.style.backgroundImage = `url('${selectedIconUrl}')`
})

/* Select icon: */

iconImages.forEach(icon => {
    icon.addEventListener("click", () => {
        selectedIconUrl = icon.src
        iconBtn.style.backgroundImage = `url('${selectedIconUrl}')`
        iconBtn.innerHTML = ""
        iconDiv.classList.add("hidden")
    })
})

/* Add task to the array & show it in DOM:  */

addBtn.addEventListener("click", () => {
    let whickTask = task.value
    daysAmount = days.value
    created = Date.now()
    noticeIn = created + (oneDay*daysAmount)
    passedTime = noticeIn - created
    finalTime = passedTime

    if(whickTask != "") {

        tasksCounter++ // Incrementing the counter to generate a new ID

        // Constructor function:
        function Object(id, image, title, days, time, created) {
            this.id = id
            this.image = image
            this.title = title
            this.days = days
            this.time = time
            this.created = created
        }

        // Function to add object to the array & to local storage:
        function addObject(id, image, title, days, time, created) {
            let p = new Object(id, image, title, days, time, created)
            array.push(p)
            localStorage.setItem("Tasks", JSON.stringify(array))
        }

        // Using function & completing object:
        addObject(tasksCounter, selectedIconUrl, whickTask, daysAmount, finalTime, created)

        // Creating tasks elements & display them in DOM:
        container.innerHTML = ""
        array.forEach((element) => {
            // Background color according to elapsed percentage of days:
            let background = ""
            const now = Date.now()
            const timeElapsed = now - element.created
            const percentageElapsed = (timeElapsed / element.time) * 100
            if (percentageElapsed >= 100) {
                background = "oneday"
            } else if (percentageElapsed >= 50) {
                background = "lessdays"
            } else {
                background = "moredays"
            }
            // Task template:
            let tempate = `
            <div class="task ${background}" data-id="${element.id}">
                <div class="task-title">
                   <img src="${element.image}" alt="Default icon" id="default-icon" class="defaultIcon"
                   <p id="task-text">${element.title}</p>
                </div>
                <div class="days-left">
                   <p>Remember me in: </p>
                   <p id="expire">${element.days}</p>
                   <p> days</p>
                   <button class="doneBtn"><b>Done!</b></button>
                </div>
            </div>
            <br>
            `
            container.innerHTML += template

            //Resets:
            without.style.display = "none" // Deletes "zero tasks" view
            task.value = "" // Resets task input
            days.value = "1" // Resets days select
            iconBtn.style.backgroundImage = "none" //Resets task icon
            iconBtn.innerHTML = "+" // Puts back "+"
            addDiv.classList.add("hidden") // Hides "add task" div
        })

    }else {
        alert("Please write your task!")
    }
})

