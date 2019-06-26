"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const moment = require("moment");
const Encryption = use("Encryption");
class SinnedUrl {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {

    const nowstime = moment();
    const nowtime = moment(nowstime, "YYYYDoMMh:mma");
    // console.log("Now Time", nowtime);
    const urltime = request.original().expired;
    const urlstime = moment(urltime, "YYYYDoMMh:mma");
    // console.log("Urltime ", urlstime);
    const diffrence = urlstime.diff(nowtime, "minute");
    console.log("Diffrence between time",diffrence);
    try {
      if (diffrence > 0) {
        const spliturl = request.originalUrl().split("signature=");
        const signature = spliturl[1];
        const decrypted = Encryption.decrypt(signature);
        console.log("Decryptrd ", decrypted);
        const gethost = request.headers().host;
        const geturl = spliturl[0].split("&")[0];
        const finalurl = gethost + geturl;
        console.log("Final Url",finalurl);

        if (finalurl === decrypted) {
          await next();
        } else {
          return response.error(417, "signature not match");
        }
      } else {
        return response.error(408, "Link was expired");
      }
    } catch (e) {
      console.log(e);
      return response.error(500);
    }
  }
}
module.exports = SinnedUrl;
