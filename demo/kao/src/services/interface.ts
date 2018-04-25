export interface ISection {
  start: number
  payload: number
  ratio: number
  key: number
  [k: string]: any
}
export interface IGroup {
  out: number
  in: number
  ratio: number
  key?: number
  payload?: number
}
