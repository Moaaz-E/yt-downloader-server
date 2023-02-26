
import {GetDefaultOptions, VideoResolution, YoutubeOptions, _VideoResolution} from "lib/lib/src/youtube"
import * as dotenv from "dotenv";
dotenv.config();


export function config() {
    const ytOptions = GetDefaultOptions();
    if(!valueInRange(getEnv("Resolution"), _VideoResolution)) {
        process.env["Resolution"] = ytOptions.Resolution.toString();
    }
    else {
        setEnvIfNull("Resolution", ytOptions.Resolution.toString());
    }
    setEnvIfNull("StreamFolder", "./streams")
}
export function getYtOptions() : YoutubeOptions {
    return {Resolution: parseInt(getEnv("Resolution") as string) as VideoResolution};
}

export function getEnv(key: string) : string | undefined {
    return process.env[key]
}

function setEnvIfNull(key: string, value : any) {
    process.env[key] = process.env[key] ? process.env[key] : value; 
}

function valueInRange(value : any, range : readonly any[]) {
    return range.some((rangeValue) => {
        return rangeValue == value;
    })
}