const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
    const Validator = use("Validator");
    const Database = use("Database");
    const Response = use("Adonis/Src/Response");
    
    const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field); //get data which we pass as body
    if (!value) {
      return;
    }

    const [table, column] = args; // where we pass validation receve here as a args
    console.log(args)
    const row = await Database.table(table)
      .where(column, value)
      .first();
    if (!row) {
      throw `Product not found on  ${value} product id`;
    }
  };
  Validator.extend("productexists", existsFn);

  Response.macro("success", function(status, data, message) {
    this.status(status).json({
      meta: {
        message: "Successfully",
        code: status,
        success: "success"
      },
      data: data
    });
  });

  Response.macro("notfound", function(status,value) {
    this.status(status).json({
      meta: {
        message: value || "Not Found ",
        code: status,
        failed: "failed"
      }
    });
  });

  Response.macro("error", function(status,error) {
    this.status(status).send({
      meta: {
        message: "Error accrued ",
        code: status,
        failed: "error"
      },
      error: error || "Authentication required or other error"
    });
  });
  Response.macro("created", function(status, data) {
    this.status(status).json({
      meta: {
        message: "Product Created",
        code: status,
        failed: "success"
      },
      createdproduct: data
    });
  });
});

hooks.after.providersBooted(() => {
const Validator = use("Validator");
const Database = use("Database");
// const Response = use("Adonis/Src/Response");

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
      return;
    }
    const [table, column] = args;
    const row = await Database.table(table)
      .where(column, value)
      .first();
    if (row) {
      throw `${column} ${value} is exist `;
    }
  };
  Validator.extend("userexists", existsFn);
});
