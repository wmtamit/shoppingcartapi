'use strict'
const Excels = require("exceljs");
const User = use("App/Models/User");
const Event = use("Event")

class Excel {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'Excel-job'
  }

  // This is where the work is done.
  async handle (data) {
    const filelocation = data.file;
    console.log(data.filetype);
      var workbook = new Excels.Workbook();
      workbook = await workbook.xlsx.readFile(data.file);
      workbook.eachSheet(function(worksheet, sheetId) {
        // console.log("Sheet Id",sheetId)
        let getsheet = workbook.getWorksheet(sheetId);
        let colComment = getsheet.getColumn("A");
        colComment.eachCell(async (cell, rowNumber) => {
          if (rowNumber > 1) {
            let username = getsheet.getCell("A" + rowNumber).value;
            let email = getsheet.getCell("B" + rowNumber).value;
            let password = getsheet.getCell("C" + rowNumber).value;
            password = toString(password);
            let usercreate = {
              username: username,
              email: email,
              password: password
            }
            const finduser = await User.findBy("email",email)
            console.log("finduser")
            // console.log(finduser)\
            
            if(finduser===null){
            const users = await User.create(usercreate);
            console.log("Users")
          //  return users
            }
            else{
                console.log("User exist")
            //   // return "User Exist"
            //   //   return response.send("User exist")
            }
          }
        });
      });
  
      const messages="Your File data Successfuly add in database"
      console.log("Send xlsx")
      Event.fire('new::addindatabase', messages)
    }
  }

module.exports = Excel

