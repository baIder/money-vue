# 错误提示


按视频中所写的代码运行后出现报错：

```typescript
    @Prop() readonly value!: number;
    output = this.value.toString();

```

![](https://img.bald3r.wang/img/20220714183607.png)


随后自己尝试解决bug:

```typescript
    output: string = '0';
    mounted() {
        console.log(`this.value: ` + this.value);
        console.log(`this.value.toString(): ` + this.value.toString());
        this.output = this.value.toString();
    }
```

![](https://img.bald3r.wang/img/20220714183951.png)


