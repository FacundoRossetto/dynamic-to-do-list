/* Variables: */

let without = document.querySelector(".without")
let addDiv = document.getElementById("add-div")
let btnIcon = document.getElementById("btn-icon")
let task = document.getElementById("task")
let addBtn = document.getElementById("add-btn")
let days = document.getElementById("days")
let iconDiv = document.getElementById("icon-div")
let iconRow = document.querySelectorAll(".icon-row")
let myTasks = document.getElementById("my-tasks")
let container = document.querySelector(".container")
let plusButton = document.getElementById("plus-button")

const iconImages = document.querySelectorAll(".icon")



/* Button to show menu to add tasks: */

btnMas.addEventListener("click", () => {
    addDiv.classList.toggle("hidden")
})

/* Button to show icons dropdown menu: */

btnIcon.addEventListener("click", () => {
    iconDiv.classList.toggle("hidden")
    btnIcon.style.backgroundImage = `url('${selectedIconUrl}')`
})

/* Select icon: */

iconImages.forEach(icon => {
    icon.addEventListener("click", () => {
        selectedIconUrl = icon.src
        btnIcon.style.backgroundImage = `url('${selectedIconUrl}')`
        btnIcon.innerHTML = ""
        iconDiv.classList.add("hidden")
    })
})

