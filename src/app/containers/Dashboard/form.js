const { PythonShell } = require("python-shell");

const caArray = [];
const mgArray = [];
const naArray = [];
const kArray = [];
const co3Array = [];
const hco3Array = [];
const clArray = [];
const so4Array = [];
const tdsArray = [];

const data = [];

const addBtn = document.getElementById("add");
const submitBtn = document.getElementById("submit");

addBtn.addEventListener("click", function () {
  caArray.push(document.getElementById("ca").value);
  mgArray.push(document.getElementById("mg").value);
  naArray.push(document.getElementById("na").value);
  kArray.push(document.getElementById("k").value);
  co3Array.push(document.getElementById("hco3").value);
  hco3Array.push(document.getElementById("co3").value);
  clArray.push(document.getElementById("cl").value);
  so4Array.push(document.getElementById("so4").value);
  tdsArray.push(document.getElementById("tds").value);

  document.getElementById("ca").value = "";
  document.getElementById("mg").value = "";
  document.getElementById("na").value = "";
  document.getElementById("k").value = "";
  document.getElementById("hco3").value = "";
  document.getElementById("co3").value = "";
  document.getElementById("cl").value = "";
  document.getElementById("so4").value = "";
  document.getElementById("tds").value = "";
});

$("#submit").click(function () {
  data.push(caArray);
  data.push(mgArray);
  data.push(naArray);
  data.push(kArray);
  data.push(hco3Array);
  data.push(co3Array);
  data.push(clArray);
  data.push(so4Array);
  data.push(tdsArray);
  let options = {
    args: [data, 9],
  };

  PythonShell.run(
    "./src/app/containers/Dashboard/form.py",
    options,
    function (err, res) {
      if (err) {
        console.log(err.stack);
      }
      if (res) {
      }
    }
  );
});
