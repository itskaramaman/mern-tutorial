const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc    Get goals
// @route   Get /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
})

// @desc    Set goalspo
// @route   Post /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error("Please add a text field");
    }

    const goal = await Goal.create({text: req.body.text});
    res.status(200).json(goal);
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error("Goal not found");
    }

    console.log(req.body.text);
    const goalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true}); // first param tp get goal, second to update and third to create new if it does not exists.
    console.log(goalUpdated);
    res.status(200).json(goalUpdated);
})

// @desc    Delete goals
// @route   DELET /api/goals/:id
// @access  Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error("Please select the goal to be deleted");
    }

    await goal.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}