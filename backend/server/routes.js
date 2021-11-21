const router = require('express').Router();
const controller = require('./controllers');

router.get('/reviews', controller.getReviews.getReviews);

router.get('/reviews/meta', controller.getReviewsMeta.getReviewsMeta);

router.post('/reviews', controller.postReview.postReview);

router.put('/reviews/:review_id/helpful', controller.helpful.helpful);

router.put('/reviews/:review_id/report', controller.report.report);

// route for loader.io to confirm IP
router.get('/loaderio-1bf4a343f8da15f6c2f310110842bf07/', (req, res) => {
  res.send('loaderio-1bf4a343f8da15f6c2f310110842bf07');
});

module.exports = router;
