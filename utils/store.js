import dotenv from 'dotenv'
dotenv.config({path:'../.env'})

const stack = process.env.STACK
const region = process.env.REGION
const slack_path = process.env.SLACK_PATH

// class Store {
//   constructor() {
//     this.stack = stack
//     this.region = region
//     this.slack_path = slack_path
//   }
// }

export const store = {

}

// export const storeStr = JSON.stringify(store)
// console.log(store)
// console.log(storeStr)
