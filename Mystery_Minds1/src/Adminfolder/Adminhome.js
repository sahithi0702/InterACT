import Adminmainpage from "./Adminmainpage";
function Adminhome(){
    return(
        <div>
            <Adminmainpage/>
        <div className="container text-center">
            <h2 className="text-dark">Welcome Admin</h2>
            <h3>
                Instructions to Admin
            </h3>
            <p>
            We have created a series of soft skills assessment games that are designed to evaluate a range of essential skills, including communication, collaboration, problem-solving, creativity, leadership, and adaptability. These games are intended to help individuals develop and improve their soft skills, which are critical for personal and professional success.

To make these games accessible to everyone, we have made them available for testing through our online portal. The tests available on our portal are designed to provide a comprehensive evaluation of an individual's soft skills, and they are suitable for people of all ages and backgrounds.

When individuals take these tests, their scores are recorded and displayed on our leaderboard. The leaderboard provides a ranking of all participants based on their performance, including their email addresses. By examining the leaderboard, users can gauge how well they performed compared to others who took the same test. The leaderboard also serves as a motivational tool to encourage individuals to work harder to improve their soft skills.

In addition to the leaderboard, our portal features an analysis tool that allows users to evaluate the soft skills of individuals based on their age group. This analysis tool provides valuable insights into the strengths and weaknesses of different age groups, helping individuals and organizations understand how to improve their soft skills based on their age and experience.

Finally, we have included a logout button on our portal, which allows administrators to log out of the portal securely. This feature ensures that unauthorized individuals cannot access sensitive data, ensuring the privacy and security of all users.

Overall, our portal provides a comprehensive and effective means of evaluating and improving soft skills. Whether you are an individual looking to enhance your soft skills or an organization seeking to develop a more skilled and productive workforce, our portal can help you achieve your goals.
            </p>
            
        </div>
    </div>
    )
}
export default Adminhome;