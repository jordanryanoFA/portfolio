const generateBtn = document.getElementById('generateBtn');
const resultDiv = document.getElementById('result');
const caption = document.getElementById('caption');
const loading = document.getElementById('loading');
const copyBtn = document.getElementById('copyBtn');

generateBtn.addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return alert('please enter an idea or a topic');

    resultDiv.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const response = await fetch('/.netlify/functions/generate', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ prompt: userInput })
        })
        const data = await response.json();
        caption.textContent = data.caption || 'no caption generated';
        resultDiv.classList.remove('hidden');
    } catch (error) {
        caption.textContent = 'Error : Unable connect to AI. Please try again Later.';
        resultDiv.classList.remove('hidden');
    }
    loading.classList.add('hidden');
})
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(captionText.textContent);
  alert("Copied to clipboard!");
});