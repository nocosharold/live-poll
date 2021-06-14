const redis = require("redis");
const client = redis.createClient(6379); //port number is optional

class Students {
	poll_answer(req, res) {
		client.exists("poll_question", async (err, result) => {
			if (result == 0) {
				res.redirect("/");
				return false;
			}
			client.hgetall("poll_question", async (err, obj) => {
				// console.log(obj);
				let list = JSON.parse(obj.choices);

				let choice_list = [];
				for (let i = 0; i < list.length; i++) {
					choice_list.push({
						vote: list[i].vote,
						choice: list[i].choice,
					});
				}

				res.render("students/poll_answer", { question: obj.question, choice_list });
			});
		});

		// res.render("students/poll_answer");
	}

	submit_answer(req, res) {
		client.exists("poll_question", async (err, result) => {
			if (result == 0) {
				return false;
			}
			client.hgetall("poll_question", async (err, obj) => {
				let list = JSON.parse(obj.choices);
				for (let i = 0; i < list.length; i++) {
					// console.log(list[i].choice);
					if (list[i].choice == req.body.choice) {
						list[i].vote = list[i].vote + 1;
					}
				}

				client.hmset("poll_question", ["choices", JSON.stringify(list)], (err, result) => {
					console.log(`here are the results ${result}`);
				});
				res.json({ message: "vote submitted" });
				// res.redirect("student_response_view");
			});
		});
	}
}

module.exports = Students;
