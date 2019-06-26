"use strict";

const kue = use("Kue");
const Job = use("App/Jobs/Csv");
const Excel = require("exceljs");
const User = use("App/Models/User");
// Data to be passed to job handle

// var queue = new Queue("express-example", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379
//   },
//   isWorker: true
// });
class ImportServices {
  static async ImportClassification(filelocation) {
    try {
      const priority = "normal"; // Priority of job, can be low, normal, medium, high or critical
      const attempts = 1; // Number of times to attempt job if it fails
      const remove = true; // Should jobs be automatically removed on completion
      const jobFn = job => {
        // Function to be run on the job before it is saved
        job.backoff();
      };
      const data = { file: filelocation };
      const job = kue.dispatch(Job.key, data, { priority, attempts, remove, jobFn })
      var workbook = new Excel.Workbook();
      workbook = await workbook.xlsx.readFile(data.file);
      workbook.eachSheet(function(worksheet, sheetId) {
        // console.log("Sheet Id",sheetId)
        let getsheet =   workbook.getWorksheet(sheetId);
        let colComment = getsheet.getColumn("A");
        colComment.eachCell(async (cell, rowNumber) => {
          if (rowNumber > 1) {
            let username = getsheet.getCell("A" + rowNumber).value;
            let email = getsheet.getCell("B" + rowNumber).value;
            let password = getsheet.getCell("C" + rowNumber).value;
            password = toString(password);
           
           
            const finduser = await User.findBy("email",email)
            // console.log(finduser)\
            console.log("Hii")
            let usercreate = {
              username: username,
              email: email,
              password: password
            }
            if(finduser===null){
            const users = await User.create(usercreate);
            console.log(users)
          //  return users
            }
            else{
                console.log("User exist")
              // return "User Exist"
              //   return response.send("User exist")
            }
          }
        });
      });
      // var job = queue.createJob({

      //   x: filelocation
      // })
      // job.save()
      // job.on('succeeded', (result) => {
      //   console.log(`Received result for job ${job.id}: ${result}`);
      //   queue.destroy().then(() => console.log('Queue Destroyed'));
      // });
    
    } catch (e) {
      console.log(e);
    }
  }

  static async ImportClassificationcsv(filelocation) {
  }
}
module.exports = ImportServices;
