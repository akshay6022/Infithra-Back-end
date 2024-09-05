const fs = require("fs");
var diff = require("deep-diff");

//uses  "deep-diff": "^1.0.2",

function jsonDiff(file1, file2) {
  let objA;
  let objB;

  objA = fs.readFileSync(file1, { encoding: "utf8" });
  objA = JSON.parse(objA);

  objB = fs.readFileSync(file2, { encoding: "utf8" });
  objB = JSON.parse(objB);

  const diffs = diff(objA, objB);
  return diffs;
}
const result = jsonDiff("jsonA.json", "jsonB.json");
console.log("result----", result);

const len = result.length;
console.log("len---", len);

if (len >=1) {
  let res = result.map((el) => {
    return {
        field: el.path.toString(),  
        oldValue: el.lhs,
        newValue: el.rhs
    }
  });
  console.log("res---",res)
}
