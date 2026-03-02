"use strict";
// debugger

// get elements for easy access
const loadingPage = document.getElementById("welcomePage");
const homePage = document.getElementById("editorHomePage");
const markdownPage = document.getElementById("markdownInterface");
const inputFileName = document.getElementById("inputFileName");
const fileName = document.getElementById("#fileName")
const newFileButtons = document.querySelectorAll("#newFileButton, #newFile");



homePage.classList.add("hidden");
markdownPage.classList.add("hidden");

// onload display loading welcome screen

setTimeout(function () {
  loadingPage.classList.add("hidden");
  homePage.classList.remove("hidden");
}, 5000);

function createNewFilefunc() {
  loadingPage.classList.add("hidden");
  homePage.classList.add("hidden");
  markdownPage.classList.remove("hidden");
}

newFileButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    createNewFilefunc()
  })
});

const files = []
const file1 ={
    id: 7323329,
    name: "delete",
    dateCreated: 17-3-2026,
}
files.push(file1)

localStorage.setItem("files",files)
localStorage.getItem("files")