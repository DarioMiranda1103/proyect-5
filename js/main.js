/*
Project: Project 5 Personal Web Site Visitor Form
Name: Dario Miranda
Submitted: April 22, 2026

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student,
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

Reflection:
In this file I organized the main startup logic for the website. I learned
that separating page behavior from validation makes the project easier to
read and maintain. One thing that was challenging was deciding what code 
belonged in each file. After working on this project, I understand better 
how a main file can act as the entry point for the entire site.
*/


document.addEventListener("DOMContentLoaded", function () {
  console.log("Responsive hiking site loaded.");
  initPage();
  initValidation("myform", "success");
});