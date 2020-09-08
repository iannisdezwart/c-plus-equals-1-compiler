import * as fs from 'fs'
import { exec } from 'child_process'

const fileIn = process.argv[2]
const fileOut = process.argv[3]

const sourceCode = fs.readFileSync(fileIn, 'utf-8')
let prevChar = ''
let line = 0
let col = 0

for (let char of sourceCode) {
	if (char == '\n') {
		line++
		col = 0
		prevChar = '\n'
	} else {
		col++
		
		if (char == '+' && prevChar == '+') {
			console.log(`${ fileIn }:${ line }:${ col }. Unexpected token ++`)
			process.exit(1)
		}

		prevChar = char
	}
}

exec(`g++ ${ fileIn } -o ${ fileOut }`, (_, stdout, stderr) => {
	if (stderr) console.log(stderr)
	if (stdout) console.log(stdout)
})