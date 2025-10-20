import Imagekit from "@imagekit/next"

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

export default imagekit