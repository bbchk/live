import fs from 'fs'

export function readJsonFile(filePath) {
  try {
    const fileText = fs.readFileSync(filePath, 'utf8')
    const jsonData = JSON.parse(fileText)
    return jsonData
  } catch (error) {
    throw new Error(
      `Error reading data from file: ${filePath}. Details: ${error.message}`,
    )
  }
}
