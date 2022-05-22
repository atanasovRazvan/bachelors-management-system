import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import AdminDashboard from "./admin/admindashboard";
import StudentDashboard from "./student/studentdashboard";
import CoordonatorDashboard from "./coordonator/coordonatordashboard";
import './dashboard.scss';

const Dashboard = () => {

    const { userRole } = useContext(AuthContext);

    const renderContent = () => {
        if (userRole === "admin")
            return <AdminDashboard />

        if (userRole === "student")
            return <StudentDashboard />

        if (userRole === "coordinator")
            return <CoordonatorDashboard />
    }

    return (
        <div className="dashboard">
            <div className="dashboard-bg" />
            {renderContent()}
        </div>
    );
}

export default Dashboard;
