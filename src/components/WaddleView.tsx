import React from 'react';
import { DuckCategory, WaddleMember } from './types.ts';
import { CATEGORY_METADATA } from './constants.tsx';
import DuckAvatar from './DuckAvatar.tsx';

interface WaddleViewProps {
    members: WaddleMember[];
    onBack: () => void;
    onViewMember: (member: WaddleMember) => void;
}

const WaddleView = ({ members, onBack, onViewMember }: WaddleViewProps) => {
    const CATEGORY_ORDER: DuckCategory[] = [
        DuckCategory.TIDE_SETTERS,
        DuckCategory.CANADA_GOOSE,
        DuckCategory.GOLDEN_BEAK,
        DuckCategory.WADING_WADDLERS,
        DuckCategory.MISCHIEVOUS_MALLARDS
    ];

    const groupedMembers = CATEGORY_ORDER.reduce((acc, cat) => {
        acc[cat] = members.filter(m => m.category === cat);
        return acc;
    }, {} as Record<DuckCategory, WaddleMember[]>);

    return (
        <div className="max-w-7xl mx-auto animate-fade-in space-y-20 pb-40 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="relative">
                    <h2 className="text-7xl font-black text-gray-900 tracking-tighter uppercase italic">The Flock</h2>
                    <div className="h-2 w-full bg-sky-400 absolute -bottom-2 -rotate-1 sketch-box border-none"></div>
                    <p className="text-2xl text-sky-600 font-bold mt-4 italic">Click any sketched duck to reveal their soul.</p>
                </div>
                <button
                    onClick={onBack}
                    className="sketch-button bg-white !text-gray-800 text-xl font-black py-4 px-10 hover:bg-gray-50 border-gray-400"
                >
                    ← Home Base
                </button>
            </div>

            {members.length === 0 ? (
                <div className="text-center py-32 bg-white sketch-box-thick border-dashed border-gray-300 shadow-inner">
                    <div className="text-9xl mb-10 opacity-30">🖊️</div>
                    <p className="text-gray-400 font-black text-3xl italic">The notebook is blank...</p>
                    <button onClick={onBack} className="mt-8 text-sky-500 font-black underline text-xl">Finish your entry to join!</button>
                </div>
            ) : (
                <div className="space-y-32">
                    {CATEGORY_ORDER.map(cat => {
                        const catMembers = groupedMembers[cat];
                        if (catMembers.length === 0) return null;
                        const meta = CATEGORY_METADATA[cat];

                        return (
                            <section key={cat} className="space-y-12">
                                <div className="flex items-center space-x-8 pb-8 border-b-4 border-black">
                                    <div className={`w-20 h-20 sketch-box-thick ${meta.color} flex items-center justify-center text-5xl text-white shadow-xl rotate-3`}>
                                        {meta.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                                            {cat}
                                        </h3>
                                        <p className="text-xl text-gray-500 font-bold italic">
                                            Population: {catMembers.length} {catMembers.length === 1 ? 'Individual' : 'Individuals'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                                    {catMembers.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()).map((member) => (
                                        <button
                                            key={member.id}
                                            onClick={() => onViewMember(member)}
                                            className="group bg-white sketch-box-thick p-10 shadow-xl hover:shadow-2xl transition-all transform hover:-rotate-2 active:scale-95 flex flex-col items-center relative text-center"
                                        >
                                            {/* Name Header */}
                                            <div className="w-full mb-8 z-20">
                                                <h4 className="text-3xl font-black text-gray-900 break-words line-clamp-1 underline decoration-sky-300 decoration-4">
                                                    {member.name}
                                                </h4>
                                                <div className={`mt-3 inline-flex items-center px-4 py-1 sketch-box text-[10px] font-black uppercase tracking-widest text-white ${meta?.color || 'bg-sky-500'} rotate-1`}>
                                                    {member.category}
                                                </div>
                                            </div>

                                            {/* Avatar with sketch frame */}
                                            <div className="w-full max-w-[180px] mb-8 pointer-events-none z-10 transition-transform group-hover:scale-110">
                                                <DuckAvatar config={member.avatar} hideManifest={true} />
                                            </div>

                                            {/* Footer Info */}
                                            <div className="mt-auto pt-6 border-t-2 border-dashed border-gray-200 w-full flex justify-between items-center">
                                                <div className="text-left">
                                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Waddled in</span>
                                                    <p className="text-sm text-gray-600 font-black">
                                                        {new Date(member.joinedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div className="w-10 h-10 bg-gray-100 sketch-box flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                                    <span className="text-lg font-black">→</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WaddleView;