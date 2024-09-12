class CsvToJson {

    transform(csvFile) {

// Convert the data to String and
// split it in an array
        let array = csvFile.toString().split("\r");

// All the rows of the CSV will be
// converted to JSON objects which
// will be added to result in an array
        let result = [];

        let headers = array[0].split(", ")

// Since headers are separated, we
// need to traverse remaining n-1 rows.
        for (let i = 1; i < array.length - 1; i++) {
            let obj = {}

            let str = array[i]
            let s = ''

            let flag = 0
            for (let ch of str) {
                if (ch === '"' && flag === 0) {
                    flag = 1
                } else if (ch === '"' && flag == 1) flag = 0
                if (ch === ', ' && flag === 0) ch = '|'
                if (ch !== '"') s += ch
            }

            // Split the string using pipe delimiter |
            // and store the values in a properties array
            let properties = s.split("|")

            for (let j in headers) {
                if (properties[j].includes(", ")) {
                    obj[headers[j]] = properties[j]
                        .split(", ").map(item => item.trim())
                } else obj[headers[j]] = properties[j]
            }
            // Add the generated object to our
            // result array
            result.push(obj)
        }

// Convert the result array to json
        return JSON.stringify(result);
    }
}

module.exports = CsvToJson