import { Link } from "react-router-dom"

const Footer=()=>{
    return(
        <footer className="py-4 bg-blue-600 text-white text-center">
        <div>© 2023 Attendance Management System</div>
        <div>develop by<Link to={'/developer'} className="ml-2 text-gray-300 underline">Usman Ali</Link></div>
    </footer>
    )
}

export default Footer