const config = require("../config/config");
const { TestCase } = require("../models");

const createTestCase = async ({
	content,
    userId,
    Id,
	approved,
}) => {

	const result = await TestCase.create({
        content,
        createdBy: userId,
        problemId: Id,
        approved,
	});
	return result;
};

const approveTestCase = async ({ editorialId }) => {
	const result = await TestCase.findOneAndUpdate(
		{ _id: editorialId },
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
	else throw new Error("Incorrect TestCase Id");
};

const getTestCase = async ({ id }) => {
	try { 
		const result = await TestCase.findOne({ problemId: id });
		if (!result) {
			throw new Error("TestCase not found");
		}
		return result;

	} catch (error) {
		console.log(error);
	}
};

const deleteTestCase = async({ id }) => {
    const result = await TestCase.findOne({ problemId: id });
    await result.remove();
}

const updateTestCase = async({
    id,
    content,
    userId,
    problemId,
	approved,
}) => {
    const result = TestCase.findOneAndUpdate(
        {_id:id},
        {
            content,
            userId,
            problemId,
	        approved,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    return result;
}

module.exports = { createTestCase, approveTestCase, getTestCase, deleteTestCase, updateTestCase};

