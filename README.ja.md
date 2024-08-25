# docker-markdown-to-pdf-with-figures

PlantUML や Kroki を含んだ Markdown を PDF や HTML に変換するための Docker イメージです

pdf の変換は以下のプロジェクトを利用しています

https://github.com/shd101wyy/crossnote

このプロジェクトは以下のVisual Studio Code向けエクステンションの一部であるため、サポートしている構文等はこの拡張機能に従います。

[Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced)

## 使い方

### 基本的な使い方

もしも以下のように`example/example-doc.md`配下にファイルがある場合

```bash
$ ls example
example-doc.md
```

以下のように実行することで PDF が生成されます

```bash
$ docker run --rm -it -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

以下のように拡張子が変更されたファイルとして生成されます

```bash
$ ls example
example-doc.md
example-doc.pdf
```

### HTML の出力

PDF だけではなく HTML を出力したいという場合は以下のように`EXPORT_HTML`の環境変数に true を指定します

```bash
$ docker run --rm -it -e EXPORT_HTML=true -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

逆に PDF の出力は不要という場合は`EXPORT_PDF`に false を指定します

```bash
$ docker run --rm -it -e EXPORT_HTML=true -e EXPORT_PDF=false -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

### PlantUML による作図が含まれる場合

環境変数`PLANTUML_SERVER`に PlantUML Server の URL を設定します。

docker を利用してローカル環境に PlantUML Server が起動している場合は以下の様に指定します。

`--net host -e PLANTUML_SERVER=http://localhost:28080/svg`

```bash
$ docker run --rm -it --net host -e PLANTUML_SERVER=http://localhost:28080/svg -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

公開されている PlantUML サーバを利用しても問題ないという場合は以下のようにしても動作します

`-e https://www.plantuml.com/plantuml`

### Kroki による作図が含まれる場合

markdown-preview-enhanced の機能を利用しているため、以下の記載と同様に`kroki=true`を指定する必要があります

https://github.com/shd101wyy/markdown-preview-enhanced/blob/97fee26beda512725e44f09e3cd34ca5e82a087b/docs/diagrams.md?plain=1#L72

```d2 {kroki=true}
direction: right
Front.Javascript -> Backend.API
```

こちらも PlantUML と同様に Kroki サーバの URL を指定する必要があります

```bash
$ docker run --rm -it --net host -e PLANTUML_SERVER=http://localhost:28080/svg -e KROKI_SERVER=http://localhost:28000`-v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

公開されている Kroki サーバを利用しても問題ないという場合は以下のようにしても動作します

`-e KROKI_SERVER=https://kroki.io`

また、Kroki サーバは PlantUML の機能も内包しているため、`KROKI_SERVER`を指定している場合は`PLANTUML_SERVER`を指定しなくとも Kroki サーバを利用して PlantUML の変換を行います。

以下を実行することで、PlantUML の変換も合わせて行います

```bash
$ docker run --rm -it --net host -e KROKI_SERVER=http://localhost:28000`-v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

### その他オプションの指定

その他 [crossnote](https://github.com/shd101wyy/crossnote) 向けのオプションで指定が必要な物が合った場合は
`CONFIG_OVERWRITE`環境変数に JSON を指定することで設定を指定することができます

この環境変数に設定することで、以下の Example で指定されている`config`部分が上書きされます。

https://github.com/shd101wyy/crossnote/blob/b64a355d496a6380f61bd76473f7b1f691bbafe5/README.md#example

例えば以下のように指定します

```json
-e CONFIG_OVERWRITE={"enableLinkify":false, "mermaidTheme": "dark"}
```

パラメータの具体的な意味は以下を参照してください

https://shd101wyy.github.io/crossnote/interfaces/NotebookConfig.html
