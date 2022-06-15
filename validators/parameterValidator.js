function validateParameters() {

    const args = process.argv.slice(2);

    if (args.length !== 4) {
        return 'Please supply the correct parameters';
    }

    if (args[0] !== '--in') {
        return 'Parameter --in is required'
    }

    if (args[2] !== '--out') {
        return 'Parameter --out is required';
    }

    return ''

}

module.exports = {
    validateParameters
};