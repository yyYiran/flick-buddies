import { Review } from "./review"

export interface ModalConfig {
  size: string,
  title: string,
  // submitButtonLabel?: string
  closeButtonLabel?: string
  // onClose(): Promise<boolean> | boolean
  // onSubmit():boolean
  // disableCloseButton?(): boolean
  // disableSubmitButton?(): boolean
  // hideCloseButton?(): boolean
  // hideSubmitButton?(): boolean
}