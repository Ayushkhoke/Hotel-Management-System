
const Review = require("../model/Review");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const { room, rating, comment } = req.body;

    if(!room || !rating || !comment){
      return res.status(400).json({
        success:false,
        message:"Please provide all required fields"
      })
    }
    const review = await Review.create({
      user: req.user.id,   // from auth middleware
      room,
      rating,
      comment
    }
  );  
  
  await review.populate("user", "name email");


if(!review){
  return res.status(400).json({
    
    sucess:false,
    message:"Review not created"})
}
    res.status(200).json({ 
      success: true,
      message: "Review created", review });
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message });  
  }
};

// DELETE REVIEW (only owner)
exports.deleteReview = async (req, res) => {
  try {
    const {reviewId}=req.body;
    if(!reviewId){
      return res.status(400).json({
        success:false,
        message:"Please provide review id to delete the review"
      })
    }
    const review = await Review.findByIdAndDelete(reviewId);

   if(!review){
    return res.status(404).json({
      success:false,
      message:"Review not found"
    })
   }
    res.status(200).json({
      success: true,
      message: "Review deleted" });



  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message });
  }
};
