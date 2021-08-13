const router = require('express').Router();
const controller = require('./controllers');

router.get('/reviews', controller.getReviews);

// router.get('/reviews/meta', controller.getReviewsMeta);

// router.post('/reviews', controller.postReview);

// router.put('/reviews/:review_id/helpful', controller.helpful);

// router.put('/reviews/:review_id/report', controller.report);

module.exports = router;
