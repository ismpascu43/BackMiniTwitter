import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const getUserController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await selectUserByIdService(id);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export default getUserController;
