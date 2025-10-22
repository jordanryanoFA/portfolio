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
    const response = await fetch('/.netlify/functions/generatev2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    console.log("Response from backend:", data);

    // konvert Markdown **bold** → jadi <strong> HTML tags
    const formattedText = (data.text || data.caption || 'No caption generated.')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Insert formatted HTML
    caption.innerHTML = formattedText;

    resultDiv.classList.remove('hidden');
  } catch (error) {
    console.error("Frontend Error:", error);
    caption.textContent = 'Error: Unable to connect to AI. Please try again later.';
    resultDiv.classList.remove('hidden');
  }

  loading.classList.add('hidden');
});

// Copy button functionality (copies visible text only)
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(caption.innerText);
  alert("Copied to clipboard!");
});


