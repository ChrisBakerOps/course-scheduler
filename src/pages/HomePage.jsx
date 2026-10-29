import useFetch from '../hooks/useFetch'
import CourseList from '../components/CourseList'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

function HomePage(){
    const {data: courses, isPending, error} = useFetch(`${BASE_URL}/courses`)
    if (isPending) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return <CourseList courses={courses}/>
}

export default HomePage