import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextInstance'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Mail } from 'lucide-react'

const Profile = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');

    const fetchProfileData = async () => {
        try {
            if (!token) return;

            const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (response.data.success) {
                setUserData(response.data.user);
                setName(response.data.user.name);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                backendUrl + '/api/user/profile',
                { name },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setUserData(response.data.user);
                setIsEditing(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, [token])

    if (!userData) {
        return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
    }

    return (
        <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fbfaf5] pt-14 pb-24 min-h-[80vh]">
            <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">
                    MY PROFILE
                </h2>
            </div>

            <div className="max-w-2xl bg-white rounded-2xl p-8 border border-[#e6e4d9] shadow-sm">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 bg-[#96c138] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {userData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900">{userData.name}</h3>
                        <p className="text-gray-500 font-medium">Customer</p>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={updateProfile} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#96c138] focus:ring-1 focus:ring-[#96c138] transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button
                                type="submit"
                                className="bg-[#96c138] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#86af32] transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setName(userData.name); }}
                                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Display Name</label>
                            <div className="flex items-center gap-3 text-lg font-medium text-gray-900">
                                <User size={20} className="text-[#96c138]" />
                                <span>{userData.name}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-500 mb-1">Email Address</label>
                            <div className="flex items-center gap-3 text-lg font-medium text-gray-900">
                                <Mail size={20} className="text-[#96c138]" />
                                <span>{userData.email}</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
