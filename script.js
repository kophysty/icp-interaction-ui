let totalRequests = 0; // Var in global view

document.getElementById('score-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const walletId = document.getElementById('wallet-id').value;

    fetch(`http://localhost:3000/get-score?walletId=${walletId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const score = Math.round(data.score);
            document.getElementById('wallet-address').textContent = `Score for wallet ${walletId}:`;
            document.getElementById('score').textContent = score;
            updateStatistics(); // Statistic update
        })
        .catch(error => {
            console.error('Error fetching score:', error);
            document.getElementById('wallet-address').textContent = '';
            document.getElementById('score').textContent = 'Error fetching score. Please try again.';
        });

        document.querySelector('.stats-btn').addEventListener('click', function() {
            const statistics = document.getElementById('statistics');
            statistics.classList.toggle('hidden');
        });

});

function updateStatistics() {
    totalRequests++;
    document.getElementById('request-count').textContent = `Total requests: ${totalRequests}`;
    document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    document.getElementById('statistics-container').addEventListener('click', function() {
        const stats = document.getElementById('statistics');
        if (stats.classList.contains('hidden')) {
            stats.classList.remove('hidden');
        } else {
            stats.classList.add('hidden');
        }
    });

}