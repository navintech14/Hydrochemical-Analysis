const { PythonShell } = require("python-shell");

let filePath;

$("#uploadBtn").change(function () {
  filePath = this.files[0].path;
  let options = {
    args: [filePath],
  };

  PythonShell.run(
    "./src/app/containers/Dashboard/script.py",
    options,
    function (err, res) {
      if (err) {
        console.log(err.stack);
      }
      if (res) {
        document.getElementById("display").src = "triangle Piper diagram.jpg";
        document.getElementById("display").src = "Durvo diagram.jpg";
        document.getElementById("display").src = "Gibbs diagram.jpg";
        document.getElementById("display").src = "Chadha diagram.jpg";
      }
    }
  );
});

// $("#plotBtn").click(function () {
//   let options = {
//     args: [filePath],
//   };

//   PythonShell.run("root.py", options, function (err, res) {
//     if (err) {
//       console.log(err.stack);
//     }
//     if (res) {
//       document.getElementById("display").src = "triangle Piper diagram.jpg";
//     }
//   });
// });
