const express = require('express')
const router = express.Router()
const pool = require('../util/database')
const { getCoursesWithPrereqs } = require('../util/courseData')
const validateCourse = require('../util/validateCourse')

async function savePrereqs(courseId, prerequisites) {
    for (const prereqId of prerequisites) {
        await pool.query(
            'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
            [courseId, prereqId]
        )
    }
}

router.get('/courses', async (req, res) => {
    try {
        res.json(await getCoursesWithPrereqs(pool))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/courses/:id', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id)
        if (!course) return res.status(404).json({ error: 'Course not found' })
        res.json(course)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/courses', async (req, res) => {
    try {
        const problem = validateCourse(req.body)
        if (problem) return res.status(400).json({ error: problem })

        const { number, title, credits, description } = req.body
        const prerequisites = req.body.prerequisites || []

        const [result] = await pool.query(
            'INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)',
            [number, title, credits, description]
        )
        await savePrereqs(result.insertId, prerequisites)

        res.status(201).json(await getCoursesWithPrereqs(pool, result.insertId))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/courses/:id', async (req, res) => {
    try {
        const problem = validateCourse(req.body)
        if (problem) return res.status(400).json({ error: problem })

        const { number, title, credits, description } = req.body
        const prerequisites = req.body.prerequisites || []
        const id = req.params.id

        const [result] = await pool.query(
            'UPDATE courses SET number = ?, title = ?, credits = ?, description = ? WHERE id = ?',
            [number, title, credits, description, id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        await pool.query('DELETE FROM prerequisites WHERE course_id = ?', [id])
        await savePrereqs(id, prerequisites)

        res.json(await getCoursesWithPrereqs(pool, id))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/courses/:id', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id)
        if (!course) return res.status(404).json({ error: 'Course not found' })

        await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id])
        res.json(course)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router