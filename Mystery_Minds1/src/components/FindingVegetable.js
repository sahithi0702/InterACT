import './FindingVegetable.css'
function FindingVegetable(){
    return (
        <div className="container">
          <form className="bodytop text-center mt-5">
            <div className="body card p-5">
              <div className="head d-flex justify-content-between container">
                <div>
                  <h3 className="remain1 ">Chance Remain: X</h3>
                </div>
                <div className="Hint1">
                  <h3 className="text-warning ml-5">Hint</h3>
                </div>
                <div>
                  <h3 className="Score1 text-primary">Score</h3>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h2 className="leveltitle text-dark mb-4">Level 1 : The ABCD</h2>
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h2 className="text-dark mb-4">
                      <b>Clue:</b> Sure, if you want the "Hint" element to move further to the left, you can adjust the positioning using Bootstrap classes. Here's an updated example:
                    </h2>
                  </div>
                  <div className="btnlink mt-4">
                    <button className="btn btn-dark">Link of Clue</button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="label text-dark">Enter your Answer:</label>
                  <input type="text" className="input form-control w-50" />
                </div>
                <div className="mt-5">
                  <button className="btn btn-dark m-2">Submit</button>
                  <button className="btn btn-dark m-2">Reset</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
}
export default FindingVegetable;