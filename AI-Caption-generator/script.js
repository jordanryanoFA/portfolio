const generateBtn = document.getElementById('generateBtn');
const resultDiv = document.getElementById('result');
const caption = document.getElementById('caption');
const loading = document.getElementById('loading');
const copyBtn = document.getElementById('copyBtn');

generateBtn.addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value.trim();
  if (!userInput) return alert('Please enter an idea or a topic');

  resultDiv.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();

    console.log("Response from backend:", data);
    
    caption.textContent = data.text || data.caption || 'No caption generated.';

    resultDiv.classList.remove('hidden');
  } catch (error) {
    console.error("Frontend Error:", error);
    caption.textContent = 'Error: Unable to connect to AI. Please try again later.';
    resultDiv.classList.remove('hidden');
  }

  loading.classList.add('hidden');
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(caption.textContent);
  alert("Copied to clipboard!");
});

