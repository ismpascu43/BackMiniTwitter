import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import {v4 as uuidv4} from 'uuid';
import generateErrorsUtils from './generateErrorsUtils.js';


export const savePhotoUtils = async (img, width, uploadDir) => {
    try {
        
        //si no existe el diectorio (carpeta) la creadmos
        try {
            await fs.access(uploadDir);
        } catch (error) {
            console.log(error);
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const imgSharp = sharp(img.data);

        imgSharp.resize(width);

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(uploadDir, imgName);

        await imgSharp.toFile(pathImg); // guarda la imagen en el directorio que contiene pathImg

        return imgName;

    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al guardar imagen', 500);
    }
}

export const deletePhotoUtils = async (imgPath) => {
    try {
        
        try {
            await fs.access(imgPath); //si existe
        } catch (error) {
            console.log(error);
            return; // si no existe sale por el cathc gral
        }

        await fs.unlink(imgPath);
    } catch (error) {
        console.log(error);
        generateErrorsUtils('Error al eliminar imagen', 500);
    }
}
