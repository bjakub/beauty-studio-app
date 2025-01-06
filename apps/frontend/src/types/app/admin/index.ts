import { LoginEmployeeDTO } from "@repo/types/dto";

import { GenericFormResponse } from "../../Forms";

export type SignInHandler = GenericFormResponse<LoginEmployeeDTO>;
