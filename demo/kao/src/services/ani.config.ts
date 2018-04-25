import { ISection, IGroup } from './interface'

export const config: { [k: string]: ISection } = {
  section1: { start: 15.88, key: 8, payload: 1, ratio: 0.063 },
  section2: { start: 8.772, key: 5, payload: 0.75, ratio: 0.114 }
}

export const g1: IGroup = {
  key: 0,
  out: config.section1.start,
  ratio: config.section1.ratio,
  get in() {
    return this.out * this.ratio
  }
}

export const g2: IGroup = {
  key: 0,
  out: config.section2.start,
  ratio: config.section2.ratio,
  get in() {
    return this.out * this.ratio
  }
}
