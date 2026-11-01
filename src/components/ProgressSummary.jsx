function ProgressSummary({courses}){
    const completedCount = courses.filter(course => course.status === 'completed').length
    const availableCount = courses.filter(course => course.status === 'available').length
    const lockedCount = courses.filter(course => course.status === 'locked').length

    return (
        <div className="alert alert-info d-flex justify-content-around">
            <span>Completed: {completedCount} of {courses.length}</span>
            <span>Available: {availableCount}</span>
            <span>Locked: {lockedCount}</span>
        </div>
    )
}

export default ProgressSummary