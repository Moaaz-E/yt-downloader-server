
export interface BasicResponse{
    message: string
}
export interface DataResponse<T> extends BasicResponse {
    data: T
}