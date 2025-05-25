import Feedback from "../models/feedback.model.js"; 

export const createNewId = async (req, res) => {
    const feedBack = req.body;

    if (!feedBack.authenticate || !feedBack.jobPosition || !feedBack.techStack ||
        !feedBack.experience || !feedBack.jobDescription || !feedBack.questions || 
        !feedBack.overallFeedback || !feedBack.questionAnswers || !feedBack.score) {
        return res.status(400).json({ success: false, message: "Please fill out all required fields." });
    }

    if (feedBack.questionAnswers.length !== feedBack.questions) {
        return res.status(400).json({ success: false, message: "Please enter the correct Number of Questions." });
    }

    const totalFeedbacks = await Feedback.countDocuments({ authenticate: feedBack.authenticate });
    feedBack.feedbackId = totalFeedbacks + 1;

    const newId = new Feedback(feedBack);
    try {
        await newId.save();
        return res.status(201).json({ success: true, data: newId }); 
    } catch (error) {
        console.error("Error in adding feedback:", error); 
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getfeedback = async (req, res) => {
    const qanda = req.body;

    console.log("Received Data:", qanda); // Debugging log

    if (!qanda.authenticate || !qanda.feedbackId) {
        return res.status(400).json({ success: false, message: "Please enter all the fields." });
    }

    const feedbackId = parseInt(qanda.feedbackId, 10); // Convert to number

    const totalFeedbacks = await Feedback.countDocuments({ authenticate: qanda.authenticate });

    console.log("Total Feedbacks:", totalFeedbacks); // Debugging log

    if (totalFeedbacks < feedbackId) {
        return res.status(400).json({ success: false, message: "Please enter a valid feedback ID." });
    }

    const user = await Feedback.findOne({ authenticate: qanda.authenticate, feedbackId: feedbackId });

    if (!user) { 
        return res.status(404).json({ success: false, message: "Feedback not found." });
    }

    return res.status(200).json({ 
        success: true, 
        data: { 
            questionAnswers: user.questionAnswers, 
            overallFeedback: user.overallFeedback,
            score: user.score // Include the score field
        } 
    });
};