import { GenericFormResponse } from "../../Forms";

export type SignInHandler = GenericFormResponse<SingInFormFields>;

interface SingInFormFields {
  username: string;
  password: string;
}
