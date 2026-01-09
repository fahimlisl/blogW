import { Router } from "express"
import { calcualteNo, loginAdmin, logOutUser, registerAdmin } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { editArticle, fetchArticle, fetchArticleList, registerArticle, removeArticle } from "../controllers/articles.controller.js";
import { editKhutba, fetchKhutba, fetchKhutbaList, khutbaRegister, removeKhutba } from "../controllers/khutba.controllers.js";
import { additionofIsCompleted, additionOfSurahNamesAndAyats, addShortmeaning, adiddionOfAyahs, editExplanationAyah, fetchSurah, fetchSurahList, isPending } from "../controllers/surah.controllers.js";



const router = Router();

// normal admin routes
router.route("/register").post(registerAdmin) // only access to mine!
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/calculate").get(verifyJWT,calcualteNo)

// article routes 
router.route("/addArticle").post(verifyJWT,registerArticle)
router.route("/editArticle/:id").patch(verifyJWT,editArticle)
router.route("/removeArticle/:id").delete(verifyJWT,removeArticle)

router.route("/fetchArticle/list").get(verifyJWT,fetchArticleList)
router.route("/fetchArticle/:id").get(verifyJWT,fetchArticle)


// khutba routes
router.route("/addKhutba").post(verifyJWT,khutbaRegister)
router.route("/editKhutba/:id").patch(verifyJWT,editKhutba)
router.route("/removeKhutba/:id").delete(verifyJWT,removeKhutba)

router.route("/fetchKhutba/list").get(verifyJWT,fetchKhutbaList)
router.route("/fetchKhutba/:id").get(verifyJWT,fetchKhutba)

// temporary routes (call once)
router.route("/addSamples").get(verifyJWT,additionOfSurahNamesAndAyats)
router.route("/addAyahSamples").get(verifyJWT,adiddionOfAyahs)
router.route("/addField").patch(verifyJWT,additionofIsCompleted)

// tafser routes
router.route("/fetchSurahList").get(verifyJWT,fetchSurahList)
router.route("/fetchSurah/:id").get(verifyJWT,fetchSurah)
router.route("/editAyahExplanation/:id").patch(verifyJWT,editExplanationAyah)
router.route("/addshortMeaning/:id").patch(verifyJWT,addShortmeaning)

router.route("/fetchTafserList").get(verifyJWT,fetchSurahList)
router.route("/fetchTafser/:id").get(verifyJWT,fetchSurah)


// diff route
router.route("/isPending/:id").get(verifyJWT,isPending)

export default router