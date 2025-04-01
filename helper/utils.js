import fs from 'fs/promises'
import { customAlphabet} from "nanoid";

export const parseArgv = (argv) =>{
    return argv.reduce((hash, entry)=>{
        const [option, value = true] = entry.split('=');
        const key=option.startsWith('--') ? option.slice(2) : '_';
        if (key == '_'){
            hash.cmd.push(option);
        } else{
            hash[key] = value.startsWith('%') ? "": value
        }
        return hash
    }, {cmd: []})
}

export const readFileHelper = async(filePath) =>{
    const products = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(products)
}

export const writeFileHelper = async(filePath, content) =>{
    await fs.writeFile(filePath, JSON.stringify(content))
    return true
}

export const getRandomId = () => {
    const alphabet = '0123456789'
    const nanoid = customAlphabet(alphabet, 4)
    return nanoid()
}