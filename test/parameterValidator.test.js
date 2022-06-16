var assert = require('assert');
validate = require('../validators/parameterValidator');
describe('Given that the are no parameter sent', function () {
  describe('When parameters are validated', function () {
    it('then there should be a validation error message sent', function () {
      var reponse = validate.validateParameters();
      assert.equal(reponse,'Please supply the correct parameters')

    });
  });
});