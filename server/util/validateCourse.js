// server/util/validateCourse.js
function validateCourse(body) {
    const { number, title, credits } = body
    if (!number || !title || credits === undefined || credits === null || credits === '') {
        return 'number, title, and credits are required'
    }
    return null
}

module.exports = validateCourse