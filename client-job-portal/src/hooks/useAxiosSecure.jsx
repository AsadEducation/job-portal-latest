import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create(
    {

        baseURL: 'http://localhost:5000',
        withCredentials: true,

    }
);

const useAxiosSecure = () => {


    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    axiosInstance.interceptors.response.use((response) => {

        return response;
    }, (error) => {

        // console.log('error lookup from interceptor ' , error);

        if (error.status === 401 || error.status === 401) {
            signOutUser()
                .then(()=>{
                    console.log('forbidden user logged out');
                    navigate('/signIn')
                })
                .catch(err => {
                    console.log(err);
                })

        }

        return Promise.reject(error);
    })

    return axiosInstance;
};

export default useAxiosSecure;