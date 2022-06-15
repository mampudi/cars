function allunique() {
    var set = new Set();
    set.add(1);
    set.add(2);
    set.add(2);

    console.log(set.has(1)) // true
    console.log(set.size)
}

allunique()