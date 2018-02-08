import Vue from 'vue'
export type Size = 'big' | 'small' | 'mini'
export declare class UploadImage extends Vue {
  static install (vue: typeof Vue): void
  src: string
  upload: (file: File) => any
  size?: Size
}
