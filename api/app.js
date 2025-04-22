const express = require('express');
const projectRoutes = require('./routes/project');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 路由
app.use('/api', projectRoutes);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});