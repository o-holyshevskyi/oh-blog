'use server';

const getDomain = async (): Promise<string> => {
    const domain = process.env.DOMAIN;
    return domain ? domain : "http://localhost:3000";
}

export default getDomain;