const getConfig = () => {
    const token = localStorage.getItem('token')
    return {
        headers: { Authorization: `Bearer ${token}` }
    }
}
export default getConfig