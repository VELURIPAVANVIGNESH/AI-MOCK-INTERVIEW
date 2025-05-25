import workRoleModel from "../models/workRole.model.js";

export const createNewWorkRole = async (req, res) => {
    const workRole = req.body;
    if (!workRole.workerRole || !workRole.experience || !workRole.authenticate) {
        return res.status(400).json({ success: false, message: "Please fill out all fields." });
    }
    const newworkRole = new workRoleModel(workRole);
    try {
        await newworkRole.save();
        return res.status(201).json({ success: true, data: newworkRole }); 
    } catch (error) {
        console.error("Error in adding workRole:", error); 
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getuserwithworkRole = async (req, res) => {
    const { workerRole, experience } = req.body;
  
    if (!workerRole || !experience) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide both workerRole and experience in the request body." 
      });
    }
  
    try {
      const workRoles = await workRoleModel.find({
        workerRole: workerRole,
        experience: { $gte: Number(experience) }
      });
      return res.status(200).json({ success: true, data: workRoles});
    } catch (error) {
      console.error("Error in getting workRole:", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };

export const updateWorkRole = async (req, res) => {
    const { workerRole, experience, authenticate  } = req.body;
  
    if (!workerRole || !experience || !authenticate ) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all fields."
      });
    }
  
    try {
      const updatedWorkRole = await workRoleModel.findOneAndUpdate(
        { authenticate: authenticate },
        { workerRole: workerRole, experience: experience  },
        { new: true }
      );
  
      if (!updatedWorkRole) {
        return res.status(404).json({
          success: false,
          message: "Work role not found."
        });
      }
  
      return res.status(200).json({ success: true, data: updatedWorkRole });
    } catch (error) {
      console.error("Error in updating workRole:", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
export const getoneWorkRole = async (req, res) => {
    const { authenticate } = req.body;
  
    if (!authenticate) {
      return res.status(400).json({
        success: false,
        message: "Please provide authenticate in the request body."
      });
    }
  
    try {
      const workRole = await workRoleModel.findOne({ authenticate: authenticate });
  
      if (!workRole) {
        return res.status(404).json({
          success: false,
          message: "Work role not found."
        });
      }
  
      return res.status(200).json({ success: true, data: workRole });
    } catch (error) {
      console.error("Error in getting workRole:", error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
  