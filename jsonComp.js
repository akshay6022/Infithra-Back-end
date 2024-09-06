const fs = require("fs");
var diff = require("deep-diff");
const { timeStamp, log } = require("console");

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

const result = jsonDiff(
  "files/nationalitiesA.json",
  "files/nationalitiesB.json"
);
// console.log("result----", result);
const len = result?.length;

console.log("main result----", result);

//-----------------------single select change--------------------------------//
function singleSelect(diffData) {
  let fieldName;
  const diff = diffData[0];
  if (diff.path.length > 1) {
    for (let i = diff.path.length - 1; i >= 0; i--) {
      if (typeof diff.path[i] === "number") {
        fieldName = diff.path[i - 1];
        break;
      }
    }
  }
  fieldName = diff.path[0];
  return {
    field: fieldName,
    oldValue: diff.lhs,
    newValue: diff.rhs,
  };
}
// const outputSingleSelect = singleSelect(result);
// console.log("outputsingle select----", outputSingleSelect);






//-----------------------multi select  change ------------------------------//
function multiSelect(diffData) {
  let fieldName;
  const diff = diffData;
  if (diffData.length > 1) {
    for (let i = diff[0].path.length - 1; i >= 0; i--) {
      if (typeof diff[0].path[i] === "number") {
        fieldName = diff[0].path[i - 1];
        break;
      }
    }
    let oldValue = "";
    let newValue = "";
    for (let j = 0; j <= diff.length - 1; j++) {
      oldValue = oldValue + "," + diff[j].lhs;
      newValue = newValue + "," + diff[j].rhs;
    }

    return {
      field: fieldName,
      oldValue: oldValue.slice(1),
      newValue: newValue.slice(1),
    };
  }
}
// const multiSelectOutput = multiSelect(result);
// console.log("multiselect output----", multiSelectOutput);















// let res;
// if (len >= 1) {
//   res = result.map((el) => {
//     return {
//       fieldPath: el.path,
//       fieldName: getFieldName(el.path),
//       oldValue: el.lhs,
//       newValue: el.rhs,
//     };
//   });
//   console.log("res---", res);
// }

// let duplicate = [];
// let indexes = [];
// for (let i = 0; i <= res.length - 1; i++) {
//   for (let j = 0; j <= res.length - 1; j++) {
//     if (res[i] == res[j]) {
//       continue;
//     } else {
//       if (res[i].fieldName === res[j].fieldName) {
//         indexes.push(res[i].fieldName);
//         duplicate.push(res[i]);
//       }
//     }
//   }
// }

// const newArr = res.filter((el) => {
//   if (el.fieldName != indexes[0]) {
//     return el;
//   }
// });
// console.log("indexes--", indexes);
// console.log("mnew array----", newArr); // removed common field names
// const data = [...new Set(duplicate)];
// console.log("data---", data); // common fields extracted

// let oldValue = "";
// let newValue = "";
// data.forEach((el) => {
//   oldValue = oldValue + "," + el.oldValue;
//   newValue = newValue + "," + el.newValue;
// });

// const combinedOldAndNeW ={
//   fieldName : data[0].fieldName,
//   oldValue: oldValue.slice(1),
//   newValue: newValue.slice(1)
// }
// console.log("old values---", oldValue);
// console.log("new values----", newValue);

// console.log("combined---",combinedOldAndNeW);

// newArr.push(combinedOldAndNeW);
// console.log("FINAL FORM----------",newArr)
