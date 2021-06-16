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

		client.expire("poll_question", 4000); ///expire in 30mins

		res.json({ message: "Poll question has been created successfully" });
	}

	teacher_response_data(req, res) {
		client.exists("poll_question", async (err, result) => {
			if (result == 0) {
				return false;
			}
			client.hgetall("poll_question", async (err, obj) => {
				let list = JSON.parse(obj.choices);

				let response_list = [];
				for (let i = 0; i < list.length; i++) {
					response_list.push({
						y: list[i].vote,
						label: list[i].choice,
					});
				}
				res.json({ question: obj.question, response_list });
			});
		});
	}
}

module.exports = Teachers;
