import express from "express";

// importing controllers
import { getmyprofile, loginuser, logout, registeruser, testingcontroller } from "../controllers/userController.js";

// importing middlewares
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// testing api
router.route("/").get(testingcontroller);

router.route("/new").post(registeruser);

router.route("/login").post(loginuser);

router.route("/me").get(isAuthenticated, getmyprofile);

router.route("/logout").get(logout);

export default router;