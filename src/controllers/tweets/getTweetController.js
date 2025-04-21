

const getTweetController = (req, res, next) => {

    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        })
    } catch (error) {
        next(error);
    }
}


export default getTweetController;
