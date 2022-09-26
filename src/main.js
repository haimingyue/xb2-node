const express = require('express');
const app = express();
const port = 3000;

/**
 * 使用JSON中间件
 */
app.use(express.json());

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

/**
 * 创建
 */

app.post('/posts', (request, response) => {
	const { content } = request.body

	response.status(201)

	console.log(request.headers['sing-along'])

	response.set('Sing-Along', 'HUATIANCUO')

	// 做出响应
	response.send({
		message: `成功创建了${content}`
	})
})