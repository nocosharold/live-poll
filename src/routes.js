module.exports = (app) => {
	const pollsController = require("./controllers/Polls");
	const poll = new pollsController();

	const teacherController = require("./controllers/Teachers");
	const teacher = new teacherController();

	const studentsController = require("./controllers/Students");
	const student = new studentsController();

	app.get("/", poll.index);
	app.get("/poll_create", teacher.poll_create);
	app.get("/poll_response", teacher.poll_response);
	app.get("/poll_answer", student.poll_answer);
	app.get("/teacher_response_data", teacher.teacher_response_data);

	app.post("/create_poll_process", teacher.create_poll_process);

	app.post("/submit_answer", student.submit_answer);
};
