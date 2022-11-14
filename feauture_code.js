const generateDatesRow = ({selectedDate, selectedDateNum}) => {
    let a = new Date(selectedDate) // ex:'2022-11-03'
    let b = selectedDateNum - 1 // ex: 4, - 1 = 3 (start arr idx = 0)
    const dates = []
    while (b >= 0) {
        dates.push(a.getDate() - b)
        b++
    }
    b = (7 - selectedDateNum) -1 // reset idx
    let c = 0
    // ex: dates = ['2022-10-31', '2022-11-01', '2022-11-02', '2022-11-04']
    while (c <= b) {
        dates.push(a.getDate() + c)
        c++
    }
    // ex: dates = [..., '2022-11-05', '2022-11-06']
}