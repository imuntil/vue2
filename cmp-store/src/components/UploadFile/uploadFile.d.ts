import Vue from 'vue'
export declare class UploadFile extends Vue {
  static install (vue: typeof Vue): void
  accept: string
  onChange: (file: File) => any
}
