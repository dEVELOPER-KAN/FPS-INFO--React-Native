var arr = [2, 1, 3]

let arr1 = [{ id: 1, name: "h" }, { id: 2, name: "k" }, { id: 3, name: "kf" }, { id: 4, name: "kf" }]
var f = []
arr1.forEach(item => {
    if (arr.indexOf(item.id) == -1) {
        f.push(item)
    }
})
console.log(f)