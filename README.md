# 日志查看器

简单的日志查看器，通过websocket收数据，连接到`/ws`。

需要服务器推送的数据类型为

```ts
type Line = { 
    level: "info" | "warn" | "error";
    labels: string[];
    content: string;
};
```

支持渲染ANSI，支持根据level和labels过滤日志