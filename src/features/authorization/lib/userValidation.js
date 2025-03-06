import {constants} from "../../../shared/config/constants";

export const userValidation = async ({ email, password }) => {
	try {
		return await constants.auth.login(email, password);
	} catch (error) {
		throw new Error(`Validation failed: ${error.message}`);
	}
}