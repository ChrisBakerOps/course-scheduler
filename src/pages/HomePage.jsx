import {useState} from 'react'
import useFetch from '../hooks/useFetch'
import CourseList from '../components/CourseList'



const BASE_URL = import.meta.env.VITE_API_BASE_URL

const isAvailable = (course, completed) => course.prerequisites.every(prereqId => completed.includes(prereqId))
const getStatus = (course, completed) => {
    if (completed.includes(course.id)) {
        return 'completed'
    }
    if (isAvailable(course, completed)) {
        return 'available'
    }
    return 'locked'
}

function HomePage(){
    const {data: courses, isPending, error} = useFetch(`${BASE_URL}/courses`)
    const [completed, setCompleted] = useState([])
    if (isPending) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    const coursesWithStatus = courses.map(course => ({...course, status: getStatus(course, completed)}))
    return <CourseList courses={coursesWithStatus}/>
}

export default HomePage