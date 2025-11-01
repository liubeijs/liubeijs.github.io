# 温暖浏阳 CSS 使用规范

说明：本规范用于指导项目内各页面样式的编写、复用与覆盖，提升一致性与维护效率。请在开发新页面前先阅读并遵循。

—

1. 引用顺序与文件结构
- 在 HTML 中，始终先引入通用样式，再引入页面专用样式：
  - common.css（通用设计令牌、基础样式、通用组件/工具类）
  - <page>.css（页面专用样式，仅编写差异化规则）
- 推荐结构：
  - /warmliuyang/common.css
  - /warmliuyang/index.html, styles.css
  - /warmliuyang/aboutus.html, aboutus.css
  - /warmliuyang/warmstar.html, warmstar.css
  - /warmliuyang/capture.html, capture.css
  - /warmliuyang/writestory.html, writestory.css

2. 设计令牌（Design Tokens）
- 统一使用 :root 中定义的 CSS 变量，禁止硬编码颜色与系统色：
  - 主题色：--warm-cinnabar, --bamboo-green
  - 背景与文本：--ios-background, --ios-secondary-background, --ios-label, --ios-secondary-label, --ios-tertiary-label
  - 分隔线：--ios-separator
  - 状态色：--warning-yellow, --danger-red, --success-green
- 如需新增通用变量，请补充到 common.css 的 :root，并在说明中注明用途。

3. 命名规范
- 类名语义化：以组件或作用语义命名，如 .back-btn, .section-title, .action-btn
- 页面作用域前缀：页面专用结构使用前缀限定，避免与通用类冲突。例如：
  - .aboutus-header, .warm-star-detail-header, .capture-header
- 变体命名：在基础类上叠加变体或尺寸类，例如：
  - .action-btn + .primary-btn / .secondary-btn
  - 尺寸变体建议：.btn--sm / .btn--lg（如需新增，统一在 common.css 中维护）

4. 通用组件使用与覆盖策略
- 返回按钮（.back-btn, .back-icon）
  - 基础样式在 common.css 已定义。页面专用样式仅允许调整少量差异：颜色、圆角、内边距。
  - 禁止重复定义 display/flex/gap/font-size/font-weight 等基础属性。
- 区块标题（.section-title）
  - 基础排版在 common.css。页面可调整 margin/padding 或字号（确有需求时）。
  - 禁止重复定义 color/font-weight，除非页面风格确需差异化并有明确理由。
- 动作按钮（.action-btn, .primary-btn, .secondary-btn）
  - 基础按钮统一使用 .action-btn，再叠加 .primary-btn 或 .secondary-btn 确定配色。
  - 避免直接对 .action-btn 设置背景色，优先使用 .primary-btn / .secondary-btn。
- 底部导航（.bottom-nav, .nav-item, .nav-icon, .nav-label）
  - 在 common.css 中提供基础样式；若页面需要不同的高度或视觉效果（如模糊玻璃态），请在页面 CSS 中用容器作用域限定进行覆盖。
  - 示例：.home-tab .bottom-nav { ... } 或 body.home .bottom-nav { ... }

5. 选择器与优先级
- 规则：尽量使用单类选择器；需要作用域限定时，使用父容器类 + 单类选择器组合。
- 避免使用 ID 选择器或过深的层级选择器，保持低特异性，方便覆盖与维护。
- 禁止使用 !important，除非为临时修复且已在备注中说明原因与清除计划。

6. 响应式与无障碍
- 移动端优先，适配 320–480 宽度；必要时使用 @media (max-width: 375px) 做细节优化。
- 安全区：底部导航需考虑 env(safe-area-inset-bottom)。
- 无障碍：为动画提供 prefers-reduced-motion 支持；文字与交互控件保持足够对比度。

7. 新页面开发步骤（建议流程）
- 步骤：
  1) 在 HTML <head> 先引入 common.css，再引入该页面 CSS。
  2) HTML 结构尽量复用通用组件类（.back-btn、.section-title、.action-btn 等）。
  3) 页面 CSS 仅编写差异化规则（如布局间距、尺寸、特有色彩），避免重复基础属性。
  4) 在本地预览（http://localhost:8000/），检查交互与视觉一致性。
  5) 如发现通用的需求，优先将样式上移到 common.css，并在此规范补充说明。

8. 示例
- 示例1：通用区块标题复用
  HTML：
  ```html
  <h2 class="section-title">最新公告</h2>
  ```
  页面 CSS（仅调整间距）：
  ```css
  .section-title { margin: 16px 12px 12px; }
  ```

- 示例2：通用返回按钮的页面差异化
  HTML：
  ```html
  <button class="back-btn"><span class="back-icon">←</span>返回</button>
  ```
  页面 CSS（差异化颜色与圆角）：
  ```css
  .story-header .back-btn { color: var(--ios-system-blue); border-radius: 8px; }
  ```

- 示例3：动作按钮的正确用法
  HTML：
  ```html
  <button class="action-btn primary-btn"><span class="btn-icon">★</span><span class="btn-text">点赞</span></button>
  ```
  页面 CSS（尺寸调整）：
  ```css
  .feed-item .action-btn { padding: 8px 12px; font-size: 14px; }
  ```

9. Do 与 Don’t
- Do：
  - 复用 common.css 的基础类与设计令牌
  - 仅在页面 CSS 中编写差异化样式（布局、间距、尺寸）
  - 使用作用域选择器限制覆盖范围
- Don’t：
  - 硬编码颜色与系统色
  - 重复定义基础排版属性（font-size、font-weight、color、display、flex 等）
  - 无故使用 !important 或高特异性选择器

10. 维护与演进
- 发现跨页面重复出现的样式，优先提炼到 common.css。
- 对通用组件进行增量优化时，需进行跨页面回归检查，并在本规范更新示例。

—

附注：本规范首版已对 back-btn/back-icon 与 section-title 的重复定义进行清理。后续如需统一底部导航或动作按钮的更多细节，请在评审后分批次推进，确保不破坏现有页面体验。