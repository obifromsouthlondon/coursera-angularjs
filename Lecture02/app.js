var student = {
  name: "",
  type: "student"
};

// on load
document.addEventListener("DOMContentLoaded", contentLoaded);

function contentLoaded()
{
  document.getElementById('name').addEventListener('keyup', keyUp);
}

function keyUp(event)
{
  calculateNumericOutput();
}

function calculateNumericOutput()
{
  // tight Coupling, low cohesion
  student.name = document.getElementById('name').value;

  var totalNameValue = 0;
  for (var i = 0; i < student.name.length; i++) {
    totalNameValue += student.name.charCodeAt(i);
  }

  // tight Coupling, low cohesion
  // insert result
  var output = "Total numeric value of your name is " + totalNameValue;
  document.getElementById("output").innerHTML = output;
}
