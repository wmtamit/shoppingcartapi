"use strict";
const Database = use("Database");
const Product = use("App/Models/Product");
const User = use("App/Models/User");
const Helpers = use("Helpers");

class ProductController {
  async index({ response }) {
    const products = await Product.all();
    // console.log(products.rows.length ===1)
    if (products.rows.length > 0) {
      return response.success(200, products);
    }
    return response.notfound(404);
  }
  async show({ response, params }) {
    // const authuser=auth.user.id
    //  const products=await Product.findBy("user_id",authuser)
    // console.log())
    try {
      const product = await Product.findBy("id", params.id);
      if (product != null) {
        // console.log(product.productImage.split(","));
        return response.success(200, product);
      }
      return response.notfound(404);
    } catch (e) {
      console.log(e);
      return response.error(401);
    }
  }
  async create({ request, response, session, auth }) {
    try {
      const username = auth.user.username;
      // const user_id=auth.user.user_id
      // const title = request
      //   .all()
      //   .title.split(" ")
      //   .join("-")
      //   .toLowerCase();
      // console.log(`uploads/productImage-${username}-${title}`);
      //  console.log(request.file("productImage").fieldName)
      var filenamearray = new Array();
      let filecount = 0;
      const product = request.all();
      const productImage = request.file("productImage", {
        types: ["image"],
        size: "1mb"
      });
      await productImage.moveAll("uploads", file => {
        filecount += 1;
        filenamearray.push(
          `uploads/${new Date().toISOString()}-${username}-${filecount}.${
            file.subtype
          }`
        );
        return {
          name: `${new Date().toISOString()}-${username}-${filecount}.${
            file.subtype
          }`
        };
      });
      // overwrite: true
      if (!productImage.moveAll()) {
        return response.error(500)
      }
      // console.log(product)
      const creproduct = await auth.user.products().create({
        title: product.title,
        description: product.description,
        price: product.price,
        productImage: filenamearray.toString()
      });
      return response
        .created(201,creproduct);
    } catch (e) {
      console.log(e);
      return response.error(500);
    }
  }
  async update({ request, response, params, auth }) {
    try {
      const product = await Product.find(params.id);
      if (product != null) {
        let message='';
        product.title = request.all().title;
        product.description = request.all().description;
        product.price = request.all().price;
        await product.save();
        return response
          .success(200,message="update succefully")
      }
      return response
        .notfound(401)
    } catch (e) {
      console.log(e)
      return response.error(500)
    }
  }
  async delete({ response, params }) {
    try {
      const product = await Product.find(params.id);
      if (product != null) {
        await product.delete();
        return response
          .success(200)
      }
      return response
        .notfound(404)
    } catch (e) {
      // console.log(e)
      return response.error(500);
    }
  }
}

module.exports = ProductController;
