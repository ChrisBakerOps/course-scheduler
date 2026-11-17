import {useState, useEffect} from 'react'
import useFetch from '../hooks/useFetch'
import CourseList from '../components/CourseList'
import ProgressSummary from '../components/ProgressSummary'

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

const removeWithDependents = (id, list, courses) => {
    let result = list.filter(courseId => courseId !== id)
    courses.forEach(course => {
        if (course.prerequisites.includes(id) && result.includes(course.id)) {
            result = removeWithDependents(course.id, result, courses)
        }
    })
    return result
}

function HomePage(){
    const {data: courses, isPending, error} = useFetch(`${BASE_URL}/api/courses`)
    const {data: savedCompletions, isPending: savedPending, error: savedError} = useFetch(`${BASE_URL}/api/completions`)
    const [completed, setCompleted] = useState([])
    const [filter, setFilter] = useState('all')
    const [message, setMessage] = useState(null)

    // when the fetch finishes, copy the server's list into editable state
    useEffect(() => {
        if (Array.isArray(savedCompletions)) setCompleted(savedCompletions)
    }, [savedCompletions])

    if (isPending || savedPending) return <p>Loading...</p>
    if (error || savedError) return <p>Error: {error || savedError}</p>

    const coursesWithStatus = courses.map(course => ({...course, status: getStatus(course, completed)}))
    const visibleCourses = coursesWithStatus.filter(course => {
        if (filter === 'completed') return course.status === 'completed'
        if (filter === 'remaining') return course.status !== 'completed'
        return true
    })

    const toggleCourse = (id) => {
        const clicked = courses.find(course => course.id === id)
        if (!completed.includes(id) && !isAvailable(clicked, completed)) return
        if (completed.includes(id)) {
            setCompleted(removeWithDependents(id, completed, courses))
        } else {
            setCompleted([...completed, id])
        }
    }

    const saveProgress = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/completions`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(completed)
            })
            const result = await res.json()
            if (!res.ok) {
                setMessage({type: 'danger', text: result.error})
                return
            }
            setCompleted(result)
            setMessage({type: 'success', text: 'Progress saved.'})
        } catch (err) {
            setMessage({type: 'danger', text: 'Could not reach the server.'})
        } finally {
            setTimeout(() => {
                setMessage(null)
            }, 5 * 1000)
        }
    }

    return (
        <>
            <ProgressSummary courses={coursesWithStatus} />
            <select className="form-select mb-3" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Courses</option>
                <option value="completed">Completed Only</option>
                <option value="remaining">Remaining</option>
            </select>
            <button className="btn btn-success mb-3" onClick={saveProgress}>Save</button>
            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            <CourseList courses={visibleCourses} allCourses={coursesWithStatus} onToggle={toggleCourse} />
        </>
    )
}

export default HomePage