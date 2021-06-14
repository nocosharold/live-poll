class Teachers {
	poll_create(req, res) {
		res.render("teachers/poll_create");
	}

	poll_response(req, res) {
		res.render("teachers/poll_response");
	}
}

module.exports = Teachers;