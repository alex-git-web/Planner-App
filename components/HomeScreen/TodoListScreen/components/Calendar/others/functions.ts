export const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd
}
export const getDayName = (dateStr:string, locale:string) =>{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' }).split(',')[0];        
}
