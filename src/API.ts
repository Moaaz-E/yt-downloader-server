
export interface BasicResponse{
    message: string
}
interface RestResponse<T> extends BasicResponse {
    data: T
}