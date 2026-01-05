import { Router } from "express"
import { loginAdmin, logOutUser, registerAdmin } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { editArticle, registerArticle, removeArticle } from "../controllers/articles.controller.js";
import { editKhutba, khutbaRegister, removeKhutba } from "../controllers/khutba.controllers.js";
import { additionOfSurahNamesAndAyats, addShortmeaning, adiddionOfAyahs, editExplanationAyah, fetchSurah, fetchSurahList } from "../controllers/surah.controllers.js";



const router = Router();

// normal admin routes
router.route("/register").post(registerAdmin) // only access to mine!
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWT,logOutUser)


// article routes 
router.route("/addArticle").post(verifyJWT,registerArticle)
router.route("/editArticle/:id").patch(verifyJWT,editArticle)
router.route("/removeArticle/:id").delete(verifyJWT,removeArticle)


// khutba routes
router.route("/addKhutba").post(verifyJWT,khutbaRegister)
router.route("/editKhutba/:id").patch(verifyJWT,editKhutba)
router.route("/removeKhutba/:id").delete(verifyJWT,removeKhutba)



// temporary routes (call once)
router.route("/addSamples").get(verifyJWT,additionOfSurahNamesAndAyats)
router.route("/addAyahSamples").get(verifyJWT,adiddionOfAyahs)


// tafser routes
router.route("/fetchSurahList").get(verifyJWT,fetchSurahList)
router.route("/fetchSurah/:id").get(verifyJWT,fetchSurah)
router.route("/editAyahExplanation/:id").patch(verifyJWT,editExplanationAyah)
router.route("/addshortMeaning/:id").patch(verifyJWT,addShortmeaning)


export default router