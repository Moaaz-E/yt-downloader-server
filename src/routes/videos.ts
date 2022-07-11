import { Router }from "express"
import { BasicResponse } from "../API";
const router = Router();
type query = {url?: string}
router.all("/video", (req, res, next) => {
    const body = req.body as query;
    let response : BasicResponse;
    if(body.url != undefined) {
        response = {message: "Received request."};
        res.status(200).json(response);
    } else {
        response = {message: "URL not provided"};
        res.status(400).send();
    }
})
export default router;