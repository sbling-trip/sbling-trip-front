export interface ObjectApiResponse<T, MetaType> {
  result: {
    payload: T[]
    meta: MetaType
  }
}

export interface ListApiResponse<T> {
  result: T[]
}

export interface ItemApiResponse<T> {
  result: T
}
