# 小红书 AI 学习分享视频生成器

这是一个面向个人账号的 **Remotion 竖屏知识视频生成器**。

当前目标不是做一个万能剪辑软件，而是先做一个固定模板：

- 1080 × 1920 小红书竖屏视频
- 自己配音
- 大标题 / 大字幕
- 卡片式分镜
- 截图展示页
- 步骤拆解页
- 总结页
- 通过 JSON 替换每期内容

## 当前版本

`v0.1`：最小可运行骨架。

它应该先做到：

1. 能打开 Remotion Studio 预览视频；
2. 能根据 `src/data/episode-001.json` 生成不同页面；
3. 能渲染导出 MP4；
4. 不依赖剪映 / CapCut；
5. 后续再逐步加入真实音频、字幕文件、截图素材和更细动画。

## 本地运行

> 这一步由 Codex 或本地终端执行。

```bash
npm install
npm run dev
```

渲染视频：

```bash
npm run render
```

输出文件默认在：

```text
out/episode-001.mp4
```

## 每期内容放在哪里

第一版先使用：

```text
src/data/episode-001.json
```

后续每期可以扩展为：

```text
public/episodes/001/
  voice.mp3
  assets/
    01.png
    02.png
    03.png
```

## 项目原则

1. 先跑通，不追求炫技。
2. 先模板化，不做万能剪辑器。
3. 中文文字必须由代码渲染，不交给 AI 图片生成。
4. Codex 只负责本地执行、安装、运行、修报错，不让 Codex 从零设计。
5. 所有复杂决策先在 ChatGPT 中完成，再交给 Codex 执行。
