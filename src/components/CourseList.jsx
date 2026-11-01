import CourseCard from './CourseCard'

function CourseList ({courses, allCourses, onToggle}){
    const getNumber = (id) => allCourses.find((course) => course.id === id).number

    return (
        <div>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} prereqNumbers={course.prerequisites.map(getNumber)} onToggle={onToggle}/>
            ))}
        </div>
    )
}

export default CourseList;