"use strict";
const SpreadSheet = use("SpreadSheet");
const Env = use("Env");
const moment = require("moment");
// const ImportService = use("App/Services/ImportServices");
const User = use("App/Models/User");
const Product = use("App/Models/Product");
const Order = use("App/Models/Order");
const Token = use("App/Models/Token");
const Helpers = use("Helpers");
const Encryption = use("Encryption");
const kue = use("Kue");
const CsvJob = use("App/Jobs/Csv");
const ExcelJob = use("App/Jobs/Excel");
class FileController {
  async fileexport({ request, response, params }) {
    const ss = new SpreadSheet(response, params.format);
    if (params.dbname === "user") {
      const users = await User.all();
      const data = [];
      data.push(["id", "UserName", "Email", "Created_at", "Updated_at"]);
      // console.log(data)

      users.toJSON().forEach(user => {
        data.push([
          user.id,
          user.username,
          user.email,
          user.created_at,
          user.updated_at
        ]);
      });
      // console.log(data)
      ss.addSheet("Users", data);
      ss.download("users-data");
    } else if (params.dbname === "product") {
      const products = await Product.all();
      const data = [];
      data.push([
        "id",
        "User Id",
        "Product Image Path",
        "Title",
        "Description",
        "Price",
        "Created At",
        "Updated At"
      ]);
      console.log(data);

      products.toJSON().forEach(product => {
        data.push([
          product.id,
          product.user_id,
          product.productImage,
          product.title,
          product.description,
          product.price,
          product.created_at,
          product.updated_at
        ]);
      });
      // console.log(data)
      ss.addSheet("Products", data);
      ss.download("Products-data");
    } else if (params.dbname === "order") {
      const orders = await Order.all();
      const data = [];
      data.push([
        "id",
        "User Id",
        "Product Id",
        "Quantity",
        "Created At",
        "Updated At"
      ]);
      console.log(data);

      orders.toJSON().forEach(order => {
        data.push([
          order.id,
          order.user_id,
          order.product_id,
          order.quantity,
          order.created_at,
          order.updated_at
        ]);
      });
      // console.log(data)
      ss.addSheet("Orders", data);
      ss.download("orders-data");
    } else {
      return response.status(404).json("Not Found any data base ");
    }
  }
  async uploadproduct({ request, response, auth }) {
    try {
      const createsign = (expiredurltime=1) => {
        const host = request.headers().host;
        const url = request.url();
        const expiredtime = moment()
          .add(expiredurltime, "hours").format("YYYYDoMMh:mm:ssa")
        console.log("expiredtime ", expiredtime);
        const newurl = host + url + "?" + "expired=" +expiredtime
    
        const encrypted = Encryption.encrypt(newurl);
        const encrypturl=newurl+"&"+"signature="+encrypted
        const decrypted = Encryption.decrypt(encrypted);
        console.log(decrypted);
        return encrypturl;
      };
          let uploadfile = request.file("upload");

          let newfilename = `${new Date().getTime()}.${uploadfile.extname}`;
          let dir = "csvfile/";
          await uploadfile.move(Helpers.tmpPath(dir), {
            name: newfilename
          });
          if (!uploadfile.moved()) {
            // console.log('error')
            return uploadfile.error(), "Error moving files", 500;
          }
          let filelocation = "tmp/" + dir + newfilename;

          const priority = "normal"; // Priority of job, can be low, normal, medium, high or critical
          const attempts = 1; // Number of times to attempt job if it fails
          const remove = true; // Should jobs be automatically removed on completion
          const jobFn = job => {
            console.log("Process");
            // Function to be run on the job before it is saved
            job.backoff();
          };
          const data = { file: filelocation, filetype: uploadfile.extname };
          if (uploadfile.extname === "csv") {
            const csvjob = kue.dispatch(CsvJob.key, data, {
              priority,
              attempts,
              remove,
              jobFn
            });
            return response.success(201, createsign());
          }
          if (uploadfile.extname === "xlsx") {
            const exceljob = await kue.dispatch(ExcelJob.key, data, {
              priority,
              attempts,
              remove,
              jobFn
            });
            return response.success(201, createsign());
          }
    } catch (error) {
      console.log("Error", e);
      return response.error(500, e);
    }
  }
}

module.exports = FileController;
