const { glob, globSync } = require('glob')

const num = parseInt(process.argv.slice(2))
if (isNaN(num)) {
  console.log('Please provide a number')
  process.exit(1)
}

const paddedNum = num.toString().padStart(5, '0')

const files = globSync('./playground/*.ts')

const file = files.find((file) => file.includes(paddedNum))
if (!file) {
  console.log('No exercise found with number', num)
  process.exit(1)
}

// run tsc on the file
const { execSync } = require('child_process')
try {
  execSync(`npx tsc --noEmit ${file}`)
} catch {
  console.log('Exercise is not solved.')
  process.exit(1)
}

// copy file to solutions
const fs = require('fs')
const path = require('path')
const solutionPath = path.join(__dirname, 'solutions', path.basename(file))
fs.copyFileSync(file, solutionPath)
console.log('Exercise solved!')
