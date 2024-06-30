const production = 'production'
const development = 'development'


const mode = production
// const mode = development
let base_url = ''



if(mode === production){
    
    base_url = "http://192.250.226.157:3001"
} else {
    base_url = "http://localhost:3001"

}

export { base_url }