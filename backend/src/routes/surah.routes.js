import {Router} from "express"
import { fetchSurah, fetchSurahList } from "../controllers/surah.controllers.js"

const router = Router()


router.route("/fetchSurahList").get(fetchSurahList)
router.route("/fetchSurah/:id").get(fetchSurah)

export default router