function CourseCard({course, prereqNumbers}){
    return (
        <div className="card mb-3">
            <div className="card-header">{course.number}: {course.title}</div>
            <div className="card-body">
                <p>{course.description}</p>
                <p>Credits: {course.credits}</p>
                <p>Prerequisites: {prereqNumbers.length ? prereqNumbers.join(', ') : "None"}</p>
            </div>
        </div>
    )
}

export default CourseCard;