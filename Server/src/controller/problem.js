const config = require("../config/config");
const { Problem } = require("../models");

const createProblem = async ({
	title,
	content,
	tags,
	difficulty,
	approved,
	id,
}) => {
	const result = await Problem.create({
		title,
		content,
		createdBy: id,
		tags,
		difficulty,
		approved,
	});
	return result;
};

const approveProblem = async ({ problemId }) => {
	const result = await Problem.findOneAndUpdate(
		{ _id: problemId },
		{
			approved: true,
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);
	if (result) return result;
	else throw new Error("Incorrect Problem Id");
};

const getProblem = async ({ id }) => {
	try {
		if (id) {
			const result1 = await Problem.findOne({ _id: id });

			if (!result1) {
				throw new Error("Problem not found");
			}
			return result1;
		} else {
			// throw new Error("Invalid Page");
			const allProblems = await Problem.find();
			return allProblems;
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteProblem = async({ id }) => {
    const result = await Problem.findById({ _id: id })
    await result.remove();
}

const updateProblem = async({
    id,
    title,
	content,
	tags,
	difficulty,
	approved,
	userEmail,
}) => {
    const result = Problem.findOneAndUpdate(
        {_id:id},
        {
            title,
	        content,
	        tags,
	        difficulty,
	        approved,
	        userEmail,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    return result;
}

module.exports = { createProblem, approveProblem, getProblem, deleteProblem, updateProblem};

