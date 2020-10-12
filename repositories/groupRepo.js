const Group = require('../db/models').group;

module.exports = {

	async find(code) {
	    const group = await Group.findAll({
	      where: {
	        code,
	      },
	    });
	    return group;
	},

	async show() {
		const groups = await Group.findAll();
		return groups;
	},

	async store(payload) {
		const group = await Group.create({
			code: payload.code,
			name: payload.name,
		},
		{ 
			silent: true 
		});
		return group;
	},

	async update(code, name)
	{
		const update = await Group.update({
          code,
          name,
        },
        {
          where: {
            code,
          },
        });
        return update;
	}
}