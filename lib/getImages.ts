import fs from 'fs'
import path from 'path'

const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp']

export function getImages(dir: string, max?: number): string[] {
  const fullPath = path.join(process.cwd(), 'public', dir)

  if (!fs.existsSync(fullPath)) return []

  const files = fs.readdirSync(fullPath)
    .filter((f) => {
      const ext = path.extname(f).toLowerCase()
      return IMAGE_EXTENSIONS.includes(ext) && !f.includes('Zone.Identifier')
    })
    .sort()

  const limited = max ? files.slice(0, max) : files
  return limited.map((f) => `${dir}/${f}`)
}