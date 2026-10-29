import CourseCard from './CourseCard'

function CourseList ({courses}){
    const getNumber = (id) => courses.find((course) => course.id === id).number

    return (
        <div>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} prereqNumbers={course.prerequisites.map(getNumber)} />
            ))}
        </div>
    )
}

export default CourseList;