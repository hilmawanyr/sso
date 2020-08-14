const Group = require("../db/models/index").group;
const Joi = require("joi");

const validateInput = (req) => {
  const schema = Joi.object({
    code: Joi.string().max(3).required(),
    name: Joi.string().required(),
  });
  const result = schema.validate(req);
  return result;
};

const findGroup = async (code, res) => {
  try {
    const group = await Group.findAll({
      where: {
        code,
      },
    });

    if (group.length === 0) {
      res.status(200).json({
        status: 23,
        desc: "empty data",
        message: `Search with '${code}' key is not found.`,
      });
      return;
    }
    return group;
  } catch (error) {
    res.status(500).json({
      status: 99,
      desc: "server error",
      message: error,
    });
  }
};

module.exports = {
  /**
   * Show all user groups
   * @method GET /api/v1/groups
   * @param {object} req
   * @param {object} res
   */
  async allGroups(req, res) {
    const groups = await Group.findAll();
    res.status(200).json({
      status: 1,
      desc: "request success",
      message: "groups successfully returned",
      data: groups,
    });
    return;
  },

  /**
   * Add user group
   * @method POST /api/v1/groups
   * @param {object} req
   * @param {object} res
   */
  async addGroup(req, res) {
    const validate = validateInput(req.body);
    if (validate.error) {
      res.status(400).json({
        err_status: 5,
        err_desc: "error validation",
        err_message: validate.error.details[0].message,
      });
      return;
    }
    const insertGroup = await Group.create(
      {
        code: req.body.code,
        name: req.body.name,
      },
      { silent: true }
    );
    res.status(201).json({
      status: 1,
      desc: "request success",
      message: "group successfully added",
      data: insertGroup,
    });
  },

  /**
   * Get specific group
   * @method GET /api/v1/groups
   * @param {object} req
   * @param {object} res
   */
  async getGroup(req, res) {
    const group = await findGroup(req.params.code, res);

    res.status(200).json({
      status: 1,
      desc: "request success",
      message: "group return successfully",
      data: group,
    });
  },

  /**
   * Update a group
   * @method PUT /api/v1/groups
   * @param {object} req
   * @param {object} res
   */
  async updateGroup(req, res) {
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

    await findGroup(code, res);

    try {
      await Group.update(
        {
          code,
          name,
        },
        {
          where: {
            code,
          },
        }
      );
      res.status(200).json({
        status: 1,
        desc: "request success",
        message: "group successfully updated",
        data: req.body,
      });
    } catch (error) {
      res.status(500).json({
        err_status: 99,
        err_desc: "system error",
        err_message: error,
      });
    }
  },
};
