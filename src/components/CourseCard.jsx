const badgeColors = {
    completed: 'bg-success',
    available: 'bg-primary',
    locked: 'bg-secondary',
}

function CourseCard({course, prereqNumbers, onToggle}){
    return (
        <div className={`card mb-3 ${course.status === 'locked' ? 'opacity-50' : ''}`}>
            <div className="card-header d-flex justify-content-between">
        <span>{course.number}: {course.title}</span>
    <span className={`badge ${badgeColors[course.status]}`}>{course.status}</span>
        </div>
            <div className="card-body">
                <p>{course.description}</p>
                <p>Credits: {course.credits}</p>
                <p>Prerequisites: {prereqNumbers.length ? prereqNumbers.join(', ') : "None"}</p>
                <input type="checkbox" checked={course.status === 'completed'} onChange={()=> onToggle(course.id)}></input>
            </div>
        </div>
    )
}

export default CourseCard;