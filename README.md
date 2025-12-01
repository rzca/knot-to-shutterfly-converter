# Knot to Shutterfly Converter

Converts [The Knot](https://www.theknot.com/) address list exported CSVs to the format required for import into [Shutterfly](https://www.shutterfly.com/).

## Features

- Parses CSV exports from The Knot wedding guest lists
- Deduplicates entries by household name
- Outputs a CSV file formatted for Shutterfly's address book import

## Prerequisites

- [Bun](https://bun.sh/) runtime (v1.3.3 or later)

## Installation

```bash
cd knot-to-shutterfly-converter
bun install
```

## Usage

1. Export your guest list from The Knot as a CSV file
2. Place the CSV file in the `data/` directory (at the repository root)
3. Update the `inputFilePath` in `knot-to-shutterfly-converter/index.ts` to point to your file
4. Run the converter:

```bash
cd knot-to-shutterfly-converter
bun run index.ts
```

5. The converted CSV will be saved to the `output/` directory (at the repository root)
