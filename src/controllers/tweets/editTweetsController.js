import editTweetsService from "../../services/tweets/editEntryService.js";

const editTweetsController = async (req, res, next) => {
    try {
        
        const { tweetId } = req.params;

        const {text, image} = req.body;

        await editTweetsService(text, image, tweetId);

        res.send({
            status: 'ok',
            message: 'Tweets actualizado.'
        })

    } catch (error) {
        next(error);
    }
    
}

export default editTweetsController;