import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="text-center animate-float">
            <h1 className="display-4 fw-black mb-0">
                <span className="text-gradient fw-bold">My Duck Persona</span>
            </h1>
            <p className="text-secondary fw-medium mt-2">Hover over the duck to see your traits</p>
        </div>
    );
};

export default Header;