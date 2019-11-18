const { Workspace, Member } = require("../database/models/index");

/*const ROLES = {
  "1": "owner",
  "2": "manager",
  "3": "member"
};*/

module.exports = {
  //List all workspaces current user owns
  listAsOwner: async function(req, res) {
    try {
      const workspaces = await Workspace.findAll({
        where: {
          ownerId: req.user.id
        }
      });

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ workspaces: workspaces });
    } catch (error) {
      console.log(error);
      res.end();
    }
  },

  //List all workspaces current user is part of
  list: async function(req, res) {
    try {
      const memberWorkspaces = await Member.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Workspace,
            as: "workspace"
          }
        ]
      });

      const workspaces = [];

      if (memberWorkspaces) {
        memberWorkspaces.forEach(memberWorkspace => {
          workspaces.push({
            roleId: memberWorkspace.roleId,
            ...memberWorkspace.workspace.dataValues
          });
        });
      }

      res
        .status(200)
        .json({ workspaces: workspaces });
    } catch (error) {
      console.log(error);
      res.end();
    }
  },

  create: async function(req, res) {
    const name = req.body.name;
    const storageProvider = req.body.storageProvider;
    const storageToken = req.body.storageToken;

    try {
      // persist in database
      const workspace = await Workspace.create({
        name: name,
        ownerId: req.user.id,
        storageToken: storageToken,
        storageProvider: storageProvider
      });

      await Member.create({
        userId: req.user.id,
        workspaceId: workspace.id,
        roleId: 1
      });

      res
        .status(200)
        .set("Content-Type", "application/json")
        .send({ workspace: workspace });
    } catch (error) {
      console.error(error);
      res.end();
    }
  }
};
