import axios from '../axios.customize';

const uploadImg = async (id, data) => {
    
    const URL_API = `v1/uploadImg/${id}`
    const res = await axios.post(URL_API, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res
}

export {
    uploadImg
}


