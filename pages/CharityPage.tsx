import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHeader from '../components/BookingHeader';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_CHARITY_PROJECTS, CHARITY_HERO_IMAGE } from '../constants';
import { CharityProject } from '../types';
import { DonationContext } from '../contexts/DonationContext';

// FIX: Define props for the `ProjectCard` component using an interface and `React.FC` to resolve a TypeScript error related to the `key` prop used in list rendering.
interface ProjectCardProps {
    project: CharityProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { t, localizeDigits, language } = useTranslation();
    const navigate = useNavigate();
    const donationContext = useContext(DonationContext);

    const progressPercentage = (project.currentAmount / project.goal) * 100;

    const handleDonate = () => {
        if (donationContext) {
            donationContext.selectProject(project);
            navigate(`/donate/${project.id}`);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col">
            <img src={project.image} alt={t(project.titleKey)} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800">{t(project.titleKey)}</h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">{t(project.descriptionKey)}</p>
                <div className="mt-4">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>{t('raised')}: {localizeDigits(project.currentAmount.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))}</span>
                        <span>{t('goal')}: {localizeDigits(project.goal.toLocaleString(language === 'en' ? 'en-US' : 'fa-IR'))}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                 <button onClick={handleDonate} className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition-transform hover:scale-105 duration-300 shadow-md shadow-green-600/30">
                    {t('donateNow')}
                </button>
            </div>
        </div>
    );
};

const CharityPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 min-h-screen">
            <BookingHeader title={t('charityPageTitle')} />
            <main>
                <div className="relative h-64 bg-cyan-800 text-white text-center flex flex-col justify-center items-center p-4">
                    <img src={CHARITY_HERO_IMAGE} className="absolute inset-0 w-full h-full object-cover opacity-20" alt={t('charityHeroAlt')}/>
                    <h1 className="text-3xl font-extrabold drop-shadow-lg">{t('charityHeroTitle')}</h1>
                    <p className="mt-2 max-w-sm opacity-90">{t('charityHeroSubtitle')}</p>
                </div>

                <div className="p-4 space-y-8 -mt-10 relative z-10">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-4 px-2">{t('ourProjects')}</h2>
                        <div className="space-y-6">
                            {MOCK_CHARITY_PROJECTS.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CharityPage;