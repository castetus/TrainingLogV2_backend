export type ApiResponse<TData, TMeta = undefined> = {
  data: TData;
  meta?: TMeta;
};