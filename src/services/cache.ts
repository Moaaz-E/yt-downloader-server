import { YTStream } from "lib/lib/src/Streams";
import {DownloadedStream} from "lib/lib/src/StreamUtilites"

const cachedStreamsKey = "_cachedStreams";
interface NamedCache<T> {
    key : string,
    data? : T
}


export interface ICacheHandler {
    GetCacheInstance<T>(Key : string) : NamedCache<T>
    GetStreamsCache() : NamedCache<DownloadedStream[]>
}


export class DefaultCacheHandler implements ICacheHandler {
    private instances : {[key : string] : NamedCache<any>} = {};
    private static handler? : DefaultCacheHandler;
    static GetHandler() : DefaultCacheHandler {
        if(this.handler === undefined) {
            this.handler = new DefaultCacheHandler();
        }
        return this.handler;
    }
    GetCacheInstance<T>(key : string) : NamedCache<T> {
         if(this.instances[key] === undefined) {
            this.instances[key] = {key: key};
        }
        return this.instances[key] as NamedCache<T>
    }
    
    GetStreamsCache() : NamedCache<DownloadedStream[]> {
        const streams = this.GetCacheInstance<DownloadedStream[]>(cachedStreamsKey)
        if(streams.data === undefined) {
            streams.data = []
        }
        return streams
    } 
}