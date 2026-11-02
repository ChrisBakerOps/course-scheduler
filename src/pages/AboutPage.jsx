function AboutPage(){
    const today = new Date().toLocaleDateString()
    return (
        <div className="card">
            <div className="card-body">
                <h2>About</h2>
                <p>Author: Christopher Baker and Aidan Murphy</p>
                <p>Date: {today}</p>
                <p>Version: 1.0.0</p>
            </div>
        </div>
    )
}

export default AboutPage;