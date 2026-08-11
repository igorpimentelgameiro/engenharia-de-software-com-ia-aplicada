export class AIService {
    constructor() {
        this.session = null;
        this.abortController = null;
        this.supportsSamplingParameters = false;
    }

    async checkRequirements() {
        const errors = [];

        if (!('LanguageModel' in self)) {
            errors.push("⚠️ As APIs nativas de IA não estão ativas.");
            errors.push("Ative a seguinte flag em chrome://flags/:");
            errors.push("- Prompt API for Gemini Nano (chrome://flags/#prompt-api-for-gemini-nano)");
            errors.push("Depois reinicie o Chrome e tente novamente.");
            return errors;
        }

        try {
            const availability = await LanguageModel.availability(this.getModelOptions());
            console.log('Language Model Availability:', availability);

            if (availability === 'unavailable') {
                errors.push('⚠️ O seu dispositivo não suporta o modelo de linguagem nativo de IA.');
            }
        } catch (error) {
            console.error('Error checking Language Model availability:', error);
            errors.push(`⚠️ Não foi possível consultar o modelo de linguagem: ${error.message}`);
        }

        return errors;
    }

    getModelOptions(file = null) {
        const expectedInputs = [{ type: 'text', languages: ['en'] }];
        const fileType = file?.type?.split('/')[0];

        if (fileType === 'image' || fileType === 'audio') {
            expectedInputs.push({ type: fileType });
        }

        return {
            expectedInputs,
            expectedOutputs: [{ type: 'text', languages: ['en'] }],
        };
    }

    async initialize(onProgress = () => {}) {
        const session = await LanguageModel.create({
            ...this.getModelOptions(),
            monitor(m) {
                m.addEventListener('downloadprogress', (event) => {
                    const percent = Math.round(event.loaded * 100);
                    console.log(`Language Model downloaded ${percent}%`);
                    onProgress(`Modelo de linguagem: ${percent}%`);
                });
            },
        });

        session.destroy();
    }

    async getParams() {
        if (typeof LanguageModel.params !== 'function') {
            console.info('Language Model sampling parameters are not available in this context.');
            return null;
        }

        try {
            const params = await LanguageModel.params();
            const requiredParams = [
                params?.defaultTemperature,
                params?.maxTemperature,
                params?.defaultTopK,
                params?.maxTopK,
            ];

            this.supportsSamplingParameters = requiredParams.every(Number.isFinite);
            console.log('Language Model Params:', params);
            return this.supportsSamplingParameters ? params : null;
        } catch (error) {
            console.info('Language Model sampling parameters are unavailable:', error);
            return null;
        }
    }

    async* createSession(question, temperature, topK, file = null) {
        this.abortController?.abort();
        this.abortController = new AbortController();

        // Destroy previous session and create new one with updated parameters
        if (this.session) {
            this.session.destroy();
        }

        const sessionOptions = {
            ...this.getModelOptions(file),
            signal: this.abortController.signal,
            initialPrompts: [
                {
                    role: 'system',
                    content: [{
                        type: "text",
                        value: `You are an AI assistant that responds clearly and objectively.
                        Always respond in plain text format instead of markdown.`
                    }]
                },
            ],
            monitor(m) {
                m.addEventListener('downloadprogress', (event) => {
                    console.log(`Session resources downloaded ${Math.round(event.loaded * 100)}%`);
                });
            },
        };

        if (this.supportsSamplingParameters) {
            sessionOptions.temperature = temperature;
            sessionOptions.topK = topK;
        }

        this.session = await LanguageModel.create(sessionOptions);

        // Build content array with text and optional file
        const contentArray = [{ type: "text", value: question }];

        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image' || fileType === 'audio') {
                // Convert file to blob for proper handling
                const blob = new Blob([await file.arrayBuffer()], { type: file.type });
                contentArray.push({ type: fileType, value: blob });
                console.log(`Adding ${fileType} to prompt:`, file.name);
            }
        }

        const responseStream = await this.session.promptStreaming(
            [
                {
                    role: 'user',
                    content: contentArray,
                },
            ],
            {
                signal: this.abortController.signal,
            }
        );

        for await (const chunk of responseStream) {
            if (this.abortController.signal.aborted) {
                break;
            }
            yield chunk;
        }
    }

    abort() {
        this.abortController?.abort();
    }

    isAborted() {
        return this.abortController?.signal.aborted;
    }
}
