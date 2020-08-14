module.exports = {
  levelIndex(req, res) {
    res.send("Welcome to level page");
  },

  levelPost(req, res) {
    res.send("Post a level");
  },

  levelPut(req, res) {
    res.send(`Edit id ${req.params.code}`);
  },

  levelPatch(req, res) {
    res.send("Update a level");
  },
};
