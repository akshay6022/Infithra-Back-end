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

function getFieldName(fieldArray) {
  if (fieldArray.length > 0) {
    const length = fieldArray.length - 1;
    let fieldName;
    for (let i = fieldArray.length - 1; i >= 0; i--) {
      if (typeof fieldArray[i] === "number") {
        return (fieldName = fieldArray[i - 1]);
      }
    }
    fieldName = fieldArray[length];
    return fieldName;
  }
}

const result = jsonDiff("jsonA.json", "jsonB.json");
console.log("result----", result);
const len = result.length;
if (len >= 1) {
  let res = result.map((el) => {
    return {
      fieldPath: el.path,
      fieldName: getFieldName(el.path),
      oldValue: el.lhs,
      newValue: el.rhs,
    };
  });
  console.log("res---", res);
}
