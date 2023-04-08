const userController = require("../controllers/user.controller");
let router = require("express").Router();

router.get("/", userController.findAllUser);
router.get("/:id", userController.findOneUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.put("/:id", userController.deleteUser);

module.exports = router;
