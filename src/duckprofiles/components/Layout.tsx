import React from 'react';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            className="layout-wrapper"
            style={{
                // FORCE FULL SCREEN: This overrides any parent constraints (like index.css)
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                overflowY: 'auto', // Allows scrolling if content gets too tall

                // Centering Logic
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: '#111827'
            }}
        >

            {/* Background Blobs */}
            <div className="bg-blob-purple animate-float"></div>
            <div className="bg-blob-yellow"></div>

            <main
                style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    padding: '2rem 1rem' // Add padding so content doesn't touch edges on mobile
                }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;