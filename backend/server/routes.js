const router = require('express').Router();
const controller = require('./controllers');

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getReviewsMeta);

router.post('/reviews', controller.postReview);

router.put('/reviews/:review_id/helpful', controller.helpful);

router.put('/reviews/:review_id/report', controller.report);

router.get('/loaderio-1bf4a343f8da15f6c2f310110842bf07/', (req, res) => {
  res.send('loaderio-1bf4a343f8da15f6c2f310110842bf07');
});

module.exports = router;
