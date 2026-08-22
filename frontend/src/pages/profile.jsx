import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    ShieldCheck,
    ArrowLeft,
    LogOut,
    UserStar,
} from "lucide-react";

import { useAuth } from "../context/authContext";

const Profile = () => {
    const navigate = useNavigate();

    const {
        user,
        isAdmin,
        logout,
    } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] px-4 pb-12 pt-28 sm:px-6">

            <div className="mx-auto w-full max-w-3xl">

                {/* Back */}

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Profile Card */}

                <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)]">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] p-8 sm:p-10">

                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">

                            {/* Avatar */}

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/40 bg-white/20 text-4xl font-bold text-white backdrop-blur-md">

                                {user.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || (
                                    <User size={40} />
                                )}

                            </div>

                            <div className="min-w-0">

                                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                    {user.name}
                                </h1>

                                <p className="mt-1 text-sm text-white/80">
                                    {user.email}
                                </p>

                                {isAdmin && (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">

                                        <UserStar
                                            size={14}
                                        />

                                        Administrator

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Account Information */}

                    <div className="p-6 sm:p-8">

                        <h2 className="mb-5 text-lg font-semibold text-[var(--color-text)]">
                            Account Information
                        </h2>

                        <div className="space-y-4">

                            {/* Name */}

                            <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">

                                    <User
                                        size={19}
                                        className="text-[var(--color-primary)]"
                                    />

                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        Name
                                    </p>

                                    <p className="mt-1 truncate font-medium text-[var(--color-text)]">
                                        {user.name}
                                    </p>

                                </div>

                            </div>

                            {/* Email */}

                            <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">

                                    <Mail
                                        size={19}
                                        className="text-[var(--color-primary)]"
                                    />

                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        Email
                                    </p>

                                    <p className="mt-1 truncate font-medium text-[var(--color-text)]">
                                        {user.email}
                                    </p>

                                </div>

                            </div>

                            {/* Role */}

                            <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">

                                    <ShieldCheck
                                        size={19}
                                        className="text-[var(--color-primary)]"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        Account type
                                    </p>

                                    <p className="mt-1 font-medium capitalize text-[var(--color-text)]">
                                        {user.role || "user"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            {isAdmin && (
                                <button
                                    onClick={() =>
                                        navigate(
                                            "/admin"
                                        )
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
                                >
                                    <UserStar
                                        size={18}
                                    />

                                    Admin Dashboard
                                </button>
                            )}

                            <button
                                onClick={
                                    handleLogout
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                <LogOut
                                    size={18}
                                />

                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;