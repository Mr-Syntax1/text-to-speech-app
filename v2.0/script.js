 // Elements
        const textBox = document.getElementById('TextBox');
        const speakBtn = document.getElementById('speakBtn');
        const stopBtn = document.getElementById('stopBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        const voiceSelect = document.getElementById('voiceSelect');
        const rateInput = document.getElementById('rate');
        const pitchInput = document.getElementById('pitch');
        const volumeInput = document.getElementById('volume');
        const rateValue = document.getElementById('rateValue');
        const pitchValue = document.getElementById('pitchValue');
        const volumeValue = document.getElementById('volumeValue');

        // Initialize voices
        function loadVoices() {
            const voices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';
            
            voices.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.name;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }

        // Load voices when they become available
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Update display values for sliders
        rateInput.addEventListener('input', () => {
            rateValue.textContent = rateInput.value;
        });

        pitchInput.addEventListener('input', () => {
            pitchValue.textContent = pitchInput.value;
        });

        volumeInput.addEventListener('input', () => {
            volumeValue.textContent = volumeInput.value;
        });

        // Speak function
        speakBtn.addEventListener('click', () => {
            const text = textBox.value.trim();
            if (text === '') {
                alert('Please enter some text to speak.');
                return;
            }

            // Stop any ongoing speech
            speechSynthesis.cancel();

            // Create new utterance
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set voice
            const voices = speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            
            // Set properties
            utterance.rate = parseFloat(rateInput.value);
            utterance.pitch = parseFloat(pitchInput.value);
            utterance.volume = parseFloat(volumeInput.value);
            
            // Speak
            speechSynthesis.speak(utterance);
            
            // Update button states
            updateButtonStates(true);
        });

        // Stop function
        stopBtn.addEventListener('click', () => {
            speechSynthesis.cancel();
            updateButtonStates(false);
        });

        // Pause function
        pauseBtn.addEventListener('click', () => {
            speechSynthesis.pause();
            updateButtonStates(false, true);
        });

        // Resume function
        resumeBtn.addEventListener('click', () => {
            speechSynthesis.resume();
            updateButtonStates(true);
        });

        // Update button states based on speech status
        function updateButtonStates(isSpeaking, isPaused = false) {
            speakBtn.disabled = isSpeaking && !isPaused;
            stopBtn.disabled = !isSpeaking;
            pauseBtn.disabled = !isSpeaking || isPaused;
            resumeBtn.disabled = !isPaused;
        }

        // Initialize button states
        updateButtonStates(false);

        // Handle speech end
        speechSynthesis.addEventListener('end', () => {
            updateButtonStates(false);
        });

        // Load voices initially
        loadVoices();