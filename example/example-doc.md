[toc]

# docker-markdown-to-pdf-with-figures-example-doc



## Diagrams

### mermaid

```mermaid
graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stroke-width:4px;
     class sq,e green
     class di orange
```


### PlantUML

https://real-world-plantuml.com/umls/4606798564687872

```plantuml
@startuml

participant "app: Application" as app
participant "cm: ContentManager" as cm
participant "item: DownloadItem" as item

activate app
activate cm

note over app: User enters media info page

note over app: Check if item exists
app->cm: findItem(itemId)
cm->cm: lookup(itemId)

alt item found
    cm-->app: item
else not found
    cm-->app: null
    app->cm: createItem(itemId, contentURL)
    cm->item: new(itemId, contentURL)
    activate item
    cm-->app: item

    app->cm: loadMetadata()
    note over cm
        Download and parse manifest, save in db
    end note
    cm-->app: onTracksAvailable
    cm-->app: onDownloadMetadata
    note over app: * See //track-selection// flow
end group

note over app: app is ready to start downloading
app->item: startDownload()


@enduml
```



### D2

```d2 {kroki=true}
ibm: IBM "Espresso" CPU {
  core0: IBM PowerPC "Broadway" Core 0
  core1: IBM PowerPC "Broadway" Core 1
  core2: IBM PowerPC "Broadway" Core 2

  rom: 16 KB ROM

  core0 -- core2

  rom -> core2
}

amd: AMD "Latte" GPU {
  mem: Memory & I/O Bridge
  dram: DRAM Controller
  edram: 32 MB EDRAM "MEM1"
  rom: 512 B SEEPROM

  sata: SATA IF
  exi: EXI

  gx: GX {
    3 MB 1T-SRAM
  }

  radeon: AMD Radeon R7xx "GX2"

  mem -- gx
  mem -- radeon

  rom -- mem

  mem -- sata
  mem -- exi

  dram -- sata
  dram -- exi
}

ddr3: 2 GB DDR3 RAM "MEM2"

amd.mem -- ddr3
amd.dram -- ddr3
amd.edram -- ddr3

ibm.core1 -- amd.mem

```
