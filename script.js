document.getElementById('score-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const walletId = document.getElementById('wallet-id').value;
    fetch(`http://localhost:3000/get-score?walletId=${walletId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('score-result').textContent = 
                `Score for wallet ${walletId}: ${data.score}`;
        })
        .catch(error => {
            console.error('Error fetching score:', error);
            document.getElementById('score-result').textContent = 
                'Error fetching score. Please try again.';
        });
});