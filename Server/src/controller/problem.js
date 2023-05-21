const config = require("../config/config");
const { Problem, User } = require("../models");

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
			const problem = await Problem.findOne({ _id: id });

			if (!problem) {
				throw new Error("Problem not found");
			}
			return problem;
		} else {
			const problems = await Problem.find();
			return problems;
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { createProblem, approveProblem, getProblem };
