const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
	console.log('服务已启动');
});

app.get('/', (repuset, response) => {
	response.send('你好');
});

const data = [
	{
		id: 1,
		title: '忆江南'
	},
    {
		id: 2,
		title: '千与千寻'
	}
];

app.get('/posts', (req, res) => {
	res.send(data);
});
app.get('/posts/:postId', (req, res) => {
	let { postId } = req.params;
    let d = data.filter(i => i.id == postId)[0]
	res.send(d);
});
