import {Router} from "express"
import { fetchArticle, fetchArticleList } from "../controllers/articles.controller.js";
import { fetchSurah, fetchSurahList } from "../controllers/surah.controllers.js";
import { fetchKhutbaList ,fetchKhutba } from "../controllers/khutba.controllers.js"

const router = Router();
// article
router.route("/article/list").get(fetchArticleList)
router.route("/article/:id").get(fetchArticle)


// tafser
router.route("/tafser/list").get(fetchSurahList)
router.route("/tafser/:id").get(fetchSurah)

// khutba
router.route("/khutba/list").get(fetchKhutbaList) // or will put a button there for view , for in pdf format
// router.route("/khubta/:id").get(fetchKhutba) // don't need this as per now , will impliment this in admin panel for editing this thing! 

export default router;