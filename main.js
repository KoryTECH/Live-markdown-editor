"use strict";

// get the main 3 screens
const loadingPage = document.getElementById("welcomePage");
const homePage = document.getElementById("editorHomePage");
const markdownPage = document.getElementById("markdownInterface");
const newFileBtn = document.querySelectorALL()

homePage.classList.add("hidden");
markdownPage.classList.add("hidden");
// onload display loading welcome screen

setTimeout(
  function () {
    loadingPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    markdownPage.classList.remove("hidden");
  },
  5000
);


function createNewFilefunc () {

}