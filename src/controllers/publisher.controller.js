import * as publisherService from '../services/publisher.service.js';

export const getPublishersByAuthor = async (req, res, next) => {
    try {
        const publishers = await publisherService.getPublishersByAuthor(req.params.author);
        return res.status(200).json(publishers);
    } catch (e) {
        return next(e);
    }
}
