import React from 'react';
import type { UserProfile } from '../types';

interface UserProfileCardProps {
    user: UserProfile;
    onRandomize: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onRandomize }) => {
    return (
        <div className="card w-100 border-light border-opacity-10 bg-dark bg-opacity-50 shadow-lg backdrop-blur">
            <div className="card-body text-center p-4">
                <h2 className="card-title fw-bold text-white mb-1">{user.username}</h2>
                <p className="card-text text-warning fst-italic mb-4">"{user.tagline}"</p>

                <hr className="border-light opacity-25 my-4" />

                <div className="d-grid gap-2">
                    <button
                        onClick={onRandomize}
                        className="btn btn-outline-light btn-lg rounded-pill fw-semibold py-3 transition-all"
                    >
                        Simulate Quiz Result (Randomize)
                    </button>
                    <small className="text-muted mt-2">
                        (In the final app, these traits will be set by the quiz logic)
                    </small>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;