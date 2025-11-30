import { readFile, writeFile } from "fs/promises";
import { parse } from "csv-parse/sync";
import path from "path";

const inputFilePath = "../data/knot.com people list 11.30.25.csv";  
// const outputFilePath = path.join(__dirname, "data", "shutterfly");

const knotCsv = await readFile(inputFilePath, "utf-8");


const parsed = parse(knotCsv);

console.log("Parsed CSV, example row:", parsed[1]);


interface Person {
    first: string;
    last: string;
    household: string;
    address_1: string;
    address_2: string | undefined;
    city: string;
    state: string;
    zip: string;
    country: string | undefined;
    email: string;
}

// this is the order needed for the columns
const processed: Person[] = parsed.slice(1).map(row => ({
    first: row[0]!, // First Name,
    last: row[1]!, // Last Name,
    household: row[2]!, // Display/Household Name (Smith Family),
    address_1: row[5]!, // Address Line 1,
    address_2: row[6], // Address Line 2,
    city: row[7]!, // City,
    state: row[8]!, // State,
    zip: row[9]!, // Postal Code,
    country: row[10], // Country,
    email: row[4]!, // Email
}));

console.log(processed)

console.log("Loaded knot.com XML data. Example: person", processed[4]);

// the input includes all people, but we just want to send one invitation per household
// create a dictionary keyed by household name
const households: { [key: string]: any } = {};

for (const person of processed) {
    if (households[person.household] != null) {
        // already have this household, skip
        // console.log(`Skipping ${person.first} ${person.last}, already have ${households[person.household].first}`);
        continue
    } {
        households[person.household] = person;
    }
}

console.log(`Processed ${Object.keys(households).length} unique households. Example household:`, Object.values(households)[3]);

Object.values(households).forEach((household: Person) => {
    if (household.address_1 == null ||household.address_1 == "") {
        console.log("WARNING: Missing address for household:", household);
    }
})

// write as json
await writeFile("../output/shutterfly_export.json", JSON.stringify(households))
console.log("Written shutterfly_export.json");

// write as csv
const csvLines = [
    "First Name,Last Name,Display/Household Name (Smith Family),Address Line 1,Address Line 2,City,State,Postal Code,Country,Email"
];

// add each line, and wrap with quotes
Object.values(households).forEach((household: Person) => {
    csvLines.push(`"${household.first}","${household.last}","${household.household}","${household.address_1}","${household.address_2 || ""}","${household.city}","${household.state}","${household.zip}","${household.country || ""}","${household.email}"`);
})

await writeFile("../output/shutterfly_export.csv", csvLines.join("\n"));

console.log("Written shutterfly_export.csv");





