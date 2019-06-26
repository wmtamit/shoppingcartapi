"use strict";
const Excel = require("exceljs");
const User = use("App/Models/User");
const Event = use("Event")
class Csv {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "Csv-job";
  }

  // This is where the work is done.
  async handle(data) {
    
    const filelocation = data.file;
      var workbook = new Excel.Workbook();
      await workbook.csv.readFile(filelocation).then(function(worksheet) {
        let colComment = worksheet.getColumn("C");
        colComment.eachCell(async (cell, rowNumber) => {
          // console.log(rowNumber);
          if (rowNumber > 1) {
            let username = worksheet.getCell("A" + rowNumber).value;
            let email = worksheet.getCell("B" + rowNumber).value;
            let password = worksheet.getCell("C" + rowNumber).value;
            password = toString(password);
            let usercreate = {
              username: username,
              email: email,
              password: password
            };
            const finduser = await User.findBy("email", email);
            if (finduser === null) {
              const users = await User.create(usercreate);
              console.log(
                "----------------------- User Created Successfuly ---------------------------------"
              );
            } else {
              console.log(
                "-------------------------- User exist ---------------------------------------"
              );
            }
          }
        });
      });
      const messages="Your File data Successfuly add in database"
      console.log("Send Csv")
      Event.fire('new::addindatabase', messages)
    }
  }


module.exports = Csv;
