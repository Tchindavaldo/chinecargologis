// Utility to get site configuration from environment variables
export const getSiteName = (): string => {
    return import.meta.env.VITE_SITE_NAME || 'CHINE CARGO LOGIS';
};

export const getSiteConfig = () => {
    return {
        name: getSiteName(),
        email: import.meta.env.VITE_SITE_EMAIL || 'contact@chinecargologis.com',
        supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@chinecargologis.com',
    };
};

export const getAllowedEmails = (): string[] => {
    const emails = import.meta.env.VITE_ALLOWED_EMAILS || '';
    return emails.split(',').map(e => e.trim()).filter(e => e.length > 0);
};
