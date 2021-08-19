const router = require('express').Router();
const controller = require('./controllers');

router.get('/', controller.getReviews);

router.get('/meta', controller.getReviewsMeta);

router.post('/', controller.postReview);

router.put('/:review_id/helpful', controller.helpful);

router.put('/:review_id/report', controller.report);

module.exports = router;
