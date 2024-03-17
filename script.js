document.addEventListener('DOMContentLoaded', function() {
    let totalRequests = 0; // Количество запросов
    const walletInput = document.getElementById('wallet-id');
    const scoreResult = document.getElementById('score');
    const requestCount = document.getElementById('request-count');
    const lastUpdated = document.getElementById('last-updated');
    const statsToggleBtn = document.querySelector('.stats-btn');

    // Инициализируем placeholder и начальное значение скора
    walletInput.placeholder = 'Enter your EVM wallet address';
    scoreResult.textContent = '0';

    // Обработчик отправки формы
    document.getElementById('score-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const walletId = walletInput.value.trim(); // Получаем значение, удаляем пробелы

        // Проверка на пустое значение
        if (!walletId) {
            scoreResult.textContent = 'Please enter a wallet ID.';
            return;
        }

        // Запрос на сервер для получения рейтинга
        fetch(`http://localhost:3000/get-score?walletId=${walletId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const score = Math.round(data.score);
                scoreResult.textContent = score; // Обновление результата рейтинга
                updateStatistics(); // Обновление статистики
            })
            .catch(error => {
                console.error('Error fetching score:', error);
                scoreResult.textContent = 'Error fetching score. Please try again.';
            });
    });

    // Переключение отображения статистики и изменение текста кнопки
    statsToggleBtn.addEventListener('click', function() {
        const stats = document.getElementById('statistics');
        stats.classList.toggle('hidden');
        this.textContent = stats.classList.contains('hidden') ? 'Show/Hide Statistics' : 'Hide Statistics';
    });

    // Функция обновления статистики
    function updateStatistics() {
        totalRequests++;
        requestCount.textContent = `Total requests: ${totalRequests}`;
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
});