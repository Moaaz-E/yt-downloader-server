import { DefaultCacheHandler, ICacheHandler } from "./cache";

let cacheHandlerFactory : (() => ICacheHandler) | undefined;
export function RegisterCacheHandlerFactory(factory : () => ICacheHandler) {
    cacheHandlerFactory = factory;
}

export function GetCacheHandler() : ICacheHandler {
    if(cacheHandlerFactory === undefined) {
        return DefaultCacheHandler.GetHandler();
    }
    else return cacheHandlerFactory();
}