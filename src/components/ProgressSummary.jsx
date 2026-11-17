function ProgressSummary({courses}){
    const completedCount = courses.filter(course => course.status === 'completed').length
    const availableCount = courses.filter(course => course.status === 'available').length
    const lockedCount = courses.filter(course => course.status === 'locked').length
    const allCount = completedCount + availableCount + lockedCount;
    const progressFillWidth = (completedCount / allCount) * 100;

    return (
       <div className="alert alert-info">
           <div className="d-flex justify-content-around">
               <span>Completed: {completedCount} of {courses.length}</span>
               <span>Available: {availableCount}</span>
               <span>Locked: {lockedCount}</span>
           </div>
           <div className="progress" style={{width: "100%"}}>
               {progressFillWidth > 0 && <div className="progress-bar" role="progressbar" style={{width: `${progressFillWidth}%`}} aria-valuenow={progressFillWidth} aria-valuemin="0" aria-valuemax="100">{`${progressFillWidth}%`}</div>}
           </div>
       </div>
    )
}

export default ProgressSummary