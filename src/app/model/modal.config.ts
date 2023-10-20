export interface ModalConfig {
  size: string,
  title: string,
  submitButtonLabel?: string
  closeButtonLabel?: string
  onClose(): Promise<boolean> | boolean
  onSubmit(): Promise<boolean> | boolean
  // disableCloseButton?(): boolean
  // disableSubmitButton?(): boolean
  // hideCloseButton?(): boolean
  // hideSubmitButton?(): boolean
}