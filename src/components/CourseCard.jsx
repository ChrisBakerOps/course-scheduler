const badgeColors = {
    completed: 'bg-success',
    available: 'bg-primary',
    locked: 'bg-secondary',
}

function CourseCard({course, prereqNumbers, onToggle}){
    return (
        <div className={`course-card card mb-3 ${course.status}-card`}>
            <div className="card-header d-flex justify-content-between">
                <strong>{course.number}</strong>
                <span className={`badge ${badgeColors[course.status]}`}>{course.status}</span>
            </div>
            <div className="card-body">
                <strong>{course.title}</strong>
                <p className="credits">{course.credits} credits</p>
                <p>{course.description}</p>
                <p><strong>Prerequisites:</strong> {prereqNumbers.length ? prereqNumbers.join(', ') : "None"}</p>
                <input type="checkbox" checked={course.status === 'completed'} onChange={()=> onToggle(course.id)}></input>
            </div>
        </div>
    )
}

export default CourseCard;