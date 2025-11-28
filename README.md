# [青枫江上](https://www.wangyan.life)

个人博客网站，记录我的兴趣与学习笔记。

BUG:
目前通过在 Footer 注入 SakanaWidget 组件实现了全局添加 sakana 组件，但有一个bug：点击网站中的链接后，sakana 组件会消失，必须手动刷新才能重新加载组件。首次加载触发 DOMContentLoaded → CDN 脚本加载 → 初始化 Sakana；点击链接跳转，Astro 使用客户端路由（View Transitions）→ 只替换 <slot /> 内容 → 不触发 DOMContentLoaded 导致 Sakana 消失；手动刷新，完整页面加载 → 触发 DOMContentLoaded 使 Sakana 重新出现。