const LANGUAGE_OPTIONS = {
    expectedInputs: [
        { type: 'text', languages: ['en'] },
    ],
    expectedOutputs: [
        { type: 'text', languages: ['en'] },
    ],
};

const aiContext = {
    session: null,
    abortController: null,
    isGenerating: false,
};

const elements = {
    samplingMode: document.getElementById('sampling-mode'),
    form: document.getElementById('question-form'),
    questionInput: document.getElementById('question'),
    output: document.getElementById('output'),
    button: document.getElementById('ask-button'),
    year: document.getElementById('year'),
};

function showOutput(message) {
    elements.output.textContent = message;
}

function setGenerating(isGenerating) {
    aiContext.isGenerating = isGenerating;
    elements.button.textContent = isGenerating ? 'Parar' : 'Enviar';
    elements.button.classList.toggle('stop-button', isGenerating);
}

function stopGeneration() {
    aiContext.abortController?.abort();
    setGenerating(false);
}

async function createSession(samplingMode) {
    aiContext.session?.destroy();

    aiContext.session = await LanguageModel.create({
        ...LANGUAGE_OPTIONS,
        samplingMode,
        initialPrompts: [
            {
                role: 'system',
                content: 'You are an AI assistant. Answer clearly, objectively, and in plain English text without Markdown.',
            },
        ],
        monitor(monitor) {
            monitor.addEventListener('downloadprogress', (event) => {
                const percent = Math.round(event.loaded * 100);
                showOutput(`Downloading the language model: ${percent}%`);
            });
        },
    });

    return aiContext.session;
}

async function askAI(question, samplingMode) {
    aiContext.abortController?.abort();
    aiContext.abortController = new AbortController();

    const session = await createSession(samplingMode);
    return session.promptStreaming(question, {
        signal: aiContext.abortController.signal,
    });
}

async function onSubmitQuestion() {
    const question = elements.questionInput.value.trim();
    if (!question) {
        showOutput('Digite uma pergunta em inglês para continuar.');
        return;
    }

    const samplingMode = elements.samplingMode.value;
    console.log('Using sampling mode:', samplingMode);

    setGenerating(true);
    showOutput('Preparando o modelo...');

    try {
        const responseStream = await askAI(question, samplingMode);
        elements.output.textContent = '';

        for await (const chunk of responseStream) {
            elements.output.textContent += chunk;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showOutput('Geração interrompida.');
        } else {
            console.error('Prompt API error:', error);
            showOutput(`Erro: ${error.message}`);
        }
    } finally {
        setGenerating(false);
    }
}

function setupEventListeners() {
    elements.form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (aiContext.isGenerating) {
            stopGeneration();
            return;
        }

        await onSubmitQuestion();
    });
}

async function checkRequirements() {
    if (!window.chrome) {
        return 'Este recurso só funciona em uma versão recente do Google Chrome.';
    }

    if (!('LanguageModel' in self)) {
        return [
            'As APIs nativas de IA não estão ativas.',
            'Ative chrome://flags/#prompt-api-for-gemini-nano, reinicie o Chrome e tente novamente.',
        ].join('\n');
    }

    try {
        const availability = await LanguageModel.availability(LANGUAGE_OPTIONS);
        console.log('Language Model Availability:', availability);

        if (availability === 'unavailable') {
            return 'O modelo de linguagem não está disponível neste dispositivo.';
        }

        if (availability === 'downloadable') {
            showOutput('O modelo será baixado quando você clicar em Enviar pela primeira vez.');
        } else if (availability === 'downloading') {
            showOutput('O modelo de linguagem está sendo baixado. Você já pode clicar em Enviar.');
        }

        return null;
    } catch (error) {
        console.error('Availability check error:', error);
        return `Não foi possível verificar o modelo: ${error.message}`;
    }
}

async function main() {
    elements.year.textContent = new Date().getFullYear();
    setupEventListeners();

    const requirementError = await checkRequirements();
    if (requirementError) {
        showOutput(requirementError);
        elements.button.disabled = true;
    }
}

main().catch((error) => {
    console.error('Initialization error:', error);
    showOutput(`Erro ao inicializar: ${error.message}`);
    elements.button.disabled = true;
});
