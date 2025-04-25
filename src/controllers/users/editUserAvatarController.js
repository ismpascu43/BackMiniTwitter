import path from 'path';

import selectUserByIdService from "../../services/users/selectUserByIdService.js";
import { savePhotoUtils, deletePhotoUtils } from "../../utils/photoUtils.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";
import { UPLOAD_DIR } from "../../../env.js";

const editUserAvatarController = async (req, res, next) => {
    try {
        
        //recuperar el archivo que me envían por fomulario
        //console.log(req.files.avatar);

        const { avatar } = req.files;

        const user = await selectUserByIdService(req.user.id);

        const uploadDir = path.join(process.cwd(), `./src/${UPLOAD_DIR}/avatars/${user.id}`);


        if(user.avatar) await deletePhotoUtils(path.join(uploadDir, user.avatar));


        const avatarName = await savePhotoUtils(avatar, 100, uploadDir);


        await updateUserAvatarService(avatarName, req.user.id);
        
        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente'
        });

    } catch (error) {
        next(error);
    }
}

export default editUserAvatarController;