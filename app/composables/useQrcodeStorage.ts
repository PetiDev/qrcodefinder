export const useQrcodeStorage = () => {
    let qrcodes: string[] = []

    const saveToLocalstorage = () => {
        localStorage.setItem("qrcodes", JSON.stringify(qrcodes))
    }

    const readLocalStorage = () => {
        const str = localStorage.getItem("qrcodes")
        qrcodes = str?JSON.parse(str):[]
    }


    const getAll = () =>{
        readLocalStorage()
        return qrcodes
    }

    const appendQrcode = (id: string) => {
        readLocalStorage()
        qrcodes.push(id)
        saveToLocalstorage()
    }
    const removeAll = () => {
        localStorage.removeItem("qrcodes")
    }


    return {
        getAll,
        appendQrcode,
        removeAll
    }
}