import { Link, useNavigate } from "react-router-dom";
import axiosInstance, { useUser } from "../context/auth";
import { useHeader } from "../context/header";
import { IoIosNotifications } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
    const { data, setData } = useUser();
    const { headerState } = useHeader();
    const url = headerState.toLowerCase();
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const logohandle = () => {
        if (data?.accessToken.length > 0) {
            if (data.user.admin) navigate('/admin/dashboard');
            else navigate(`/user/dashboard`);
        } else {
            navigate('/');
        }
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ ...data, user: { ...data.user, imageUrl: file } });
        }
    };

    const handleImageUpdate = () => {
        setShowEdit(!showEdit);
    };

    const imageUpdate = async () => {
        setLoading(true);
        try {
            if (!data.user.imageUrl) {
                throw new Error("No image file selected");
            }

            const formData = new FormData();
            formData.append("avatar", data.user.imageUrl);

            const response = await axiosInstance.put(`/user/update-image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setData({ ...data, user: { ...data.user, imageUrl: response.data.imageUrl } });
                toast.success("Image updated successfully!");
            } else {
                toast.error("Error updating image");
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            toast.error("Failed to update image.");
        } finally {
            setLoading(false);
            setShowEdit(false);
        }
    };

    return (
        <header className="flex justify-center items-center p-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-md sticky top-0">
            <div className="flex items-center justify-between w-full max-w-7xl px-4">
                <div className="flex items-center cursor-pointer" onClick={logohandle}>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide hover:opacity-80 transition-opacity">
                        AMS
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    {data?.user?.admin && (
                        <Link to={'/admin/dashboard/leaves-request'} className="relative group flex items-center">
                            <IoIosNotifications size={'1.8rem'} />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-4 h-4 flex items-center justify-center rounded-full animate-pulse text-white group-hover:bg-red-500">3</span>
                        </Link>
                    )}
                    <Link
                        to={url === "register" ? "/" : `/${url}`}
                        className="hover:underline text-lg capitalize"
                    >
                        {headerState}
                    </Link>
                    {data?.accessToken && (
                        <div className="relative group">
                            {data?.user?.imageUrl ? (
                                <img
                                    src={data.user.imageUrl}
                                    alt="profile"
                                    className="w-12 h-12 rounded-full border-2 border-white hover:border-gray-300 transition duration-200 ease-in-out object-cover cursor-pointer"
                                    onClick={handleImageUpdate}
                                />
                            ) : (
                                <div
                                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
                                    onClick={handleImageUpdate}
                                >
                                    <span className="text-lg font-semibold">{data?.user?.fullName?.charAt(0)}</span>
                                </div>
                            )}
                            <button
                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow-md transition-opacity opacity-0 group-hover:opacity-100"
                                onClick={handleImageUpdate}
                            >
                                <FiEdit2 size="1rem" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal for updating image */}
            {showEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowEdit(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-center">Update Profile Image</h3>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 mb-4"
                            onChange={fileChangeHandler}
                        />
                        <button
                            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={imageUpdate}
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
