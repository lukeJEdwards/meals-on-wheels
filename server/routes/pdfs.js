const express = require("express");
const { jsPDF } = require("jspdf");
const fs = require("fs");
require("jspdf-autotable");

const router = express.Router();

router.put("/meals", (req, res) => {
  if (!fs.existsSync(`./server/PDFs/${req.body.week.startDate}/meals/`)) {
    fs.mkdirSync(`./server/PDFs/${req.body.week.startDate}/meals/`, {
      recursive: true,
    });
  }
  meals(req.body.week, req.body.chunks, req.body.day);
  const data = fs.readFileSync(
    `./server/PDFs/${req.body.week.startDate}/meals/${getDay(req.body.day)}.pdf`
  );
  res.contentType("application/pdf");
  res.send(data);
});

router.put("/delivers", (req, res) => {
  if (!fs.existsSync(`./server/PDFs/${req.body.week.startDate}/delivers/`)) {
    fs.mkdirSync(`./server/PDFs/${req.body.week.startDate}/delivers/`, {
      recursive: true,
    });
  }
  delivers(req.body.week, req.body.chunks, req.body.day);
  const data = fs.readFileSync(
    `./server/PDFs/${req.body.week.startDate}/delivers/${getDay(
      req.body.day
    )}.pdf`
  );
  res.contentType("application/pdf");
  res.send(data);
});

function meals(week, chunks, day) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.text(`${mealTotals(week, day)}`, 10, 10);
  let rows = [];
  chunks.forEach((chunk) => {
    chunk.clients.forEach((client) => {
      let arr = fullClientToArray(client);
      let weekClientData = week.data.filter((a) => a.id == client.id)[0];
      arr.push(dayToArray(weekClientData.days[day]));
      arr.push(chunk.deliver);
      rows.push(arr);
    });
  });
  doc.autoTable({
    head: [["Name", "Address", "Dietary requirements", "Meals", "deliver"]],
    body: rows,
    styles: { fontSize: 12 },
  });
  doc.save(`./server/PDFs/${week.startDate}/meals/${getDay(day)}.pdf`);
}

function delivers(week, chunks, day) {
  const doc = new jsPDF({ orientation: "landscape" });
  let i = 0;
  chunks.forEach((chunk) => {
    if (i != 0) {
      doc.addPage("a4", "landscape");
    }
    let rows = [];
    chunk.clients.forEach((client) => {
      let arr = clientToArray(client);
      let weekClientData = week.data.filter((a) => a.id == client.id)[0];
      arr.push(dayToArray(weekClientData.days[day]));
      rows.push(arr);
    });
    doc.autoTable({
      foot: [["Deliver: ", `${chunk.deliver}`]],
      head: [["Name", "Address", "Comments", "Meals"]],
      body: rows,
      styles: { fontSize: 12 },
    });
    i++;
  });
  doc.save(`./server/PDFs/${week.startDate}/delivers/${getDay(day)}.pdf`);
}

function fullClientToArray(client) {
  return [
    `${client.forename} ${client.surname}`,
    `${client.address} ${client.postcode}`,
    client.dietaryRequirements,
  ];
}
function clientToArray(client) {
  return [
    `${client.forename} ${client.surname}`,
    `${client.address} ${client.postcode}`,
    client.comments.length > 0 ? client.comments : "",
  ];
}

function dayToArray(day) {
  return [
    `main: ${day.main}`,
    `veg: ${day.veg}`,
    `soup: ${day.soup}`,
    `pudding: ${day.pudding}`,
  ];
}
function getDay(day) {
  switch (day) {
    case 0:
      return "Mon";
    case 1:
      return "Tue";
    case 2:
      return "Wed";
    case 3:
      return "Thu";
    case 4:
      return "Fri";
    default:
      break;
  }
}
function mealTotals(week, day) {
  let options = ["main", "veg", "soup", "pudding"];
  let string = "";
  options.forEach(
    (option) => (string += `${option}: ${mealOptionTotal(week, day, option)} `)
  );
  return string;
}
function mealOptionTotal(week, day, option) {
  return week.data.reduce(
    (dailyTotal, client) => (dailyTotal += parseInt(client.days[day][option])),
    0
  );
}
module.exports = router;
