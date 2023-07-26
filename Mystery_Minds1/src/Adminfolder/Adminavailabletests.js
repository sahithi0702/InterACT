import Adminmainpage from "./Adminmainpage";
function AdminavailableTests(){
    return (
        <div>
            <Adminmainpage />
           <marquee scrollamount="12"><h3 className="text-center text-dark">This page displays the Available Challenges only users can start the challenges</h3></marquee> 
            <div className="container mt-1">
                <div className="row">
    
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card">
                            <img src="https://learn.g2.com/hubfs/G2CM_FI028_Learn_Article_Images-Hard_Skills_vs._Soft_Skills_Image1_V1a.png" className="card-img-top" alt="Forest Quest" />
                            <div className="card-body">
                                <h5 className="card-title">The Adventure Quest of a Curious Child</h5>
                                <p className="card-text">Join a young child on an adventure filled with puzzles and challenges. From deciphering mirror reflections to solving riddles,
                                 navigating lost directions, the child's curiosity and problem-solving skills are put to the test. Can you take him way back home? Join the child on this thrilling adventure to find out!</p>
                                 <div className='d-flex justify-content-around'>
                                <button className="btn btn-primary" >This challange is Available</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminavailableTests;