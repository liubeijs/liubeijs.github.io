# 温暖浏阳 App（Vue 3 + Vite）

这是一个移动端项目脚手架，包含路由、状态管理、通用设计令牌与基础样式。

开发准备
- 安装 Node.js（建议 18+）、npm 或 pnpm/yarn
- 进入项目目录并安装依赖：
  ```bash
  cd warmliuyang-app
  npm install
  ```

运行与构建
- 启动开发服务器：
  ```bash
  npm run dev
  ```
- 构建生产包：
  ```bash
  npm run build
  ```
- 预览构建结果：
  ```bash
  npm run preview
  ```

项目结构
- src/styles/tokens.css：通用设计令牌（颜色变量等）
- src/styles/base.css：通用基础样式与常用组件样式
- src/pages：页面组件（首页、发现、随手拍、关于）
- src/components/BottomNav.vue：底部导航组件
- src/router/index.js：路由配置

注意事项
- 页面样式应尽量复用 tokens.css 与 base.css 中的通用规则，仅在页面内写差异化样式。
- 如需引入 UI 组件库（已安装 Vant），建议按需引入。