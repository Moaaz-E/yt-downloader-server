import { Router }from "express"
import { YTStream } from "lib/lib/src/Streams"
import { IsValidYTUrl } from "lib/lib/src/youtube";
import { DownloadStream } from "lib/lib/src/StreamUtilites";
import { BasicResponse, DataResponse } from "../API";
import { GetCacheHandler } from "../services/serviceManager";
import { getEnv, getYtOptions } from "../utils";
const router = Router();
type query = {url?: string}

router.post("/video/stream", async (req, res, next) => {
    const body = req.body as query;
    let response : BasicResponse;
    try {
        if(body.url !== undefined && body.url.trim() != "") {
            if(IsValidYTUrl(body.url)) {
                response = {message: "Received request."};
                const streams = GetCacheHandler().GetStreamsCache();
                if(streams.data !== undefined) {
                    const streamInfo = await DownloadStream(body.url, getEnv("StreamFolder"), getYtOptions());
                    if(streamInfo !== undefined) {
                        streams.data.push(streamInfo);
                    }
                    else {
                        throw "Encountered an internal error while downloading stream.";
                    }
                }
                res.status(200).json(response);
            } else {
                throw `Provided url is not valid: ${body.url}`;
            }
        } else {
            throw "URL not provided";
        }
    } catch (error) {
        response = {message: error as string};
        res.status(400).send(response);
    }
})

router.get("/video/list", (req, res, next) => {
    const cachedStreams = GetCacheHandler().GetStreamsCache();
    const data = cachedStreams.data?.map((streamInfo) => {
        const stream = streamInfo.stream;
        return {url: stream.StreamUrl, title: stream.Title, channel: stream.Channel, id: stream.VideoId, started: stream.Started, error: stream.Error}
    })
    const response : DataResponse<typeof data> = {message: "success", data: data ? data : []};
    res.status(200).json(response);
})

export default router;