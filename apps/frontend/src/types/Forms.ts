export interface GenericFormResponse<T> {
  success: boolean;
  defaultValues?: T;
  message?: string;
  errors?: Record<keyof T, string>;
}
