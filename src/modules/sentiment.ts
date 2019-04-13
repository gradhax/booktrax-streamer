import language from '@google-cloud/language';

export async function analyzeSentiment(text: string) {
    const client = new language.LanguageServiceClient();

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    return result;
}
