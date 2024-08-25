# docker-markdown-to-pdf-with-figures

[Japanese version](./README.ja.md)

This is a Docker image for converting Markdown with PlantUML and Kroki diagrams to PDF and HTML.

The PDF conversion uses the following project:

https://github.com/shd101wyy/crossnote

This project is part of the Visual Studio Code extension, so the supported syntax follows this extension:

[Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced)

## Usage

### Basic Usage

If you have a file like `example/example-doc.md` as shown below:

```bash
$ ls example
example-doc.md
```

You can generate a PDF by running the following command:

```bash
$ docker run --rm -it -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

The file will be generated with the extension changed as shown below:

```bash
$ ls example
example-doc.md
example-doc.pdf
```

### HTML Output

If you want to output HTML as well as PDF, set the `EXPORT_HTML` environment variable to true as shown below:

```bash
$ docker run --rm -it -e EXPORT_HTML=true -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

If you do not need PDF output, set `EXPORT_PDF` to false:

```bash
$ docker run --rm -it -e EXPORT_HTML=true -e EXPORT_PDF=false -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

### Including Diagrams with PlantUML

Set the URL of the PlantUML Server in the `PLANTUML_SERVER` environment variable.

If you have a PlantUML Server running locally using Docker, specify it as follows:

`--net host -e PLANTUML_SERVER=http://localhost:28080/svg`

```bash
$ docker run --rm -it --net host -e PLANTUML_SERVER=http://localhost:28080/svg -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

If you are okay with using a public PlantUML server, you can specify it as follows:

`-e PLANTUML_SERVER=https://www.plantuml.com/plantuml`

### Including Diagrams with Kroki

Since this uses the markdown-preview-enhanced feature, you need to specify `kroki=true` as described below:

https://github.com/shd101wyy/markdown-preview-enhanced/blob/97fee26beda512725e44f09e3cd34ca5e82a087b/docs/diagrams.md?plain=1#L72

```d2 {kroki=true}
direction: right
Front.Javascript -> Backend.API
```

Similarly to PlantUML, you need to specify the URL of the Kroki server:

```bash
$ docker run --rm -it --net host -e PLANTUML_SERVER=http://localhost:28080/svg -e KROKI_SERVER=http://localhost:28000 -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

If you are okay with using a public Kroki server, you can specify it as follows:

`-e KROKI_SERVER=https://kroki.io`

Since the Kroki server also includes PlantUML functionality, if you specify `KROKI_SERVER`, you do not need to specify `PLANTUML_SERVER` for PlantUML conversion.

Run the following command to perform PlantUML conversion as well:

```bash
$ docker run --rm -it --net host -e KROKI_SERVER=http://localhost:28000 -v $PWD:/docs dbgso/markdown-to-pdf-with-figures /docs/example/example-doc.md
```

### Specifying Other Options

If you need to specify other options for [crossnote](https://github.com/shd101wyy/crossnote), you can set them using the `CONFIG_OVERWRITE` environment variable in JSON format.

By setting this environment variable, the `config` part specified in the following example will be overwritten:

https://github.com/shd101wyy/crossnote/blob/b64a355d496a6380f61bd76473f7b1f691bbafe5/README.md#example

For example, specify as follows:

```json
-e CONFIG_OVERWRITE={"enableLinkify":false, "mermaidTheme": "dark"}
```

Refer to the following for the specific meaning of the parameters:

https://shd101wyy.github.io/crossnote/interfaces/NotebookConfig.html