const Group = require("../db/models/index").group;
const GroupRepo  =require("../repositories/groupRepo");
const Joi = require("joi");

const validateInput = (req) => {
  const schema = Joi.object({
    code: Joi.string().max(3).required(),
    name: Joi.string().required(),
  });
  const result = schema.validate(req);
  return result;
};

module.exports = {

  /**
   * Show all user groups
   * @method GET /api/v1/groups
   */
  allGroups(req, res) {
    GroupRepo.show()
      .then(response => {
        res.status(200).json({
          status: 1,
          desc: "request success",
          message: "groups successfully returned",
          data: response,
        });
      })
      .catch(e => {
        res.status(500).json({
          status: 99,
          desc: "server error",
          message: e
        });
      });
  },

  /**
   * Add user group
   * @method POST /api/v1/groups
   */
  async addGroup(req, res) {
    const validate = await validateInput(req.body);
    if (validate.error) {
      res.status(400).json({
        err_status: 5,
        err_desc: "error validation",
        err_message: validate.error.details[0].message,
      });
      return;
    }

    GroupRepo.store(req.body)
      .then(response => {
        res.status(201).json({
          status: 1,
          desc: "request success",
          message: "group successfully added",
          data: response,
        });  
      })
      .catch(e => {
        res.status(500).json({
          status: 99,
          desc: "server error",
          message: e
        });
      });    
  },

  /**
   * Get specific group
   * @method GET /api/v1/groups
   */
  getGroup(req, res) {
    GroupRepo.find(req.params.code, res)
      .then(response => {
        if (group.length === 0) {
          res.status(200).json({
            status: 23,
            desc: "empty data",
            message: `Search with '${req.params.code}' key is not found.`,
          });
        } else {
          res.status(200).json({
            status: 1,
            desc: "request success",
            message: "group return successfully",
            data: response,
          });
        }
      })
      .catch(e => {
        res.status(500).json({
          status: 99,
          desc: "server error",
          message: e,
        });
      })
  },

  /**
   * Update a group
   * @method PUT /api/v1/groups
   */
  updateGroup(req, res) {
    const { code, name } = req.body;
    const validate = validateInput(req.body);
    if (validate.error) {
      res.status(400).json({
        err_status: 5,
        err_desc: "error validation",
        err_message: validate.error.details[0].message,
      });
      return;
    }

    GroupRepo.find(code)
      .then(response => {
        if (response.length === 0) {
          res.status(200).json({
            status: 23,
            desc: "empty data",
            message: `Search with '${code}' key is not found.`,
          });
          return;

        } else {
          GroupRepo.update(code, name)
            .then(response => {
              res.status(200).json({
                status: 1,
                desc: "request success",
                message: "group successfully updated",
                data: req.body,
              });
              return;
            });
        }
      })
      .catch(e => {
        res.status(500).json({
          err_status: 99,
          err_desc: "system error",
          err_message: e,
        });
        return;
      });
  },
};
