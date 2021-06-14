const redis = require("redis");
const client = redis.createClient(6379); //port number is optional

class Teachers {
	poll_create(req, res) {
		res.render("teachers/poll_create");
	}

	poll_response(req, res) {
		res.render("teachers/poll_response");
	}

	create_poll_process(req, res) {
		let choices = [];
		for (let i = 0; i < req.body.choice.length; i++) {
			choices.push({
				choice: req.body.choice[i],
				vote: 0,
			});
		}
		client.hmset("poll_question", ["question", req.body.question, "choices", JSON.stringify(choices)], (err, result) => {});

		client.expire("poll_question", 1800); ///expire in 30mins

		res.json({ message: "Poll question has been created succussfully" });
	}
}

module.exports = Teachers;
