/* eslint-disable no-console */
import { envVars } from "../config/envVars";
import { IUser, UserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { makeHashedPassword } from "./makeHashedPassword";


export const seedDefaultAdmin = async () => {
    try {
        // Logic to seed super admin user using env variables
        const superAdminsData: Partial<IUser> = {
            email: envVars.DEFAULT_ADMIN.EMAIL,
            password: envVars.DEFAULT_ADMIN.PASSWORD,
            name: envVars.DEFAULT_ADMIN.NAME,
            profilePhoto: 'default-profile.png',
        };
        // Add logic to save superAdmin to the database
        const superAdminExists = await User.findOne({ email: superAdminsData.email });

        if (!superAdminExists) {
            const hashedPass = await makeHashedPassword(superAdminsData.password as string);
            superAdminsData.password = hashedPass;
            superAdminsData.role = UserRole.ADMIN;
            superAdminsData.isVerified = true;
            // Save superAdmin to the database
            const superAdmin = await User.create(superAdminsData);
            console.log(`Super Admin created with email: ${superAdmin.email}`);
        } else {
            console.log('Super Admin already exists. Skipping creation.');
        }
    } catch (error) {
        console.log(error);
    }
}