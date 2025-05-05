import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import createTweetService from "../../services/tweets/createTweetService.js";


const newTweetController = async (req, res, next) => {
    
    const {text} = req.body;

    if(!text){
        throw generateErrorsUtils('El texto es requerido y debe tener entre 1 y 280 caracteres', 400);
    }

    const tweetId = await createTweetService(req.user, text);


    try {
        res.send({
            status: 'ok',
            message: `Tweet creado con éxito: ${tweetId}`
        })
    } catch (error) {
        next(error);
    }

}


export default newTweetController;
