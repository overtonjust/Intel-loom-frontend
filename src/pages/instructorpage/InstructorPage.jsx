import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import axios from "axios";

const InstructorPage = () => {
    const { id } = useParams();
    const navigate = { useNavigate };
    const [instructorData, setInstructorData] = useState(null);
    console.log(instructorData)

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;



        axios.get(`${API}/instructors/${id}`)
            .then(res =>

                setInstructorData(res.data))
            .catch(err => {
                console.log(err)
                navigate('/404');
            });
    }, [id], navigate);

    // Display loading message if instructorData is not yet available
    if (!instructorData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="instructor-page">
            <h1>{instructorData.firstName} {instructorData.lastName}</h1>
            <img src={instructorData.profilePicture} alt={`${instructorData.firstName}'s profile`} />
            <p>{instructorData.bio}</p>
            <p>Email: {instructorData.email}</p>
        </div>
    );
};

export default InstructorPage;




