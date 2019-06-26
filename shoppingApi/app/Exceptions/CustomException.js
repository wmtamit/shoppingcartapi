'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  // handle(error,{response}){
  //   console.log("Exception",error)
  //   return response.status(422).json(message)
  // }
}

module.exports = CustomException
