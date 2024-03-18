document.addEventListener('DOMContentLoaded', function() {
    // Удаление переменных, связанных с закомментированными элементами
    const walletInput = document.getElementById('wallet-id');
    const scoreResult = document.getElementById('score');
    
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
    
        // Временно убираем вызов нереализованной функции
        // if (!isValidEthereumAddress(walletId)) {
        //     scoreResult.textContent = 'Please enter a valid Ethereum address.';
        //     return;
        // }
    
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
                // Переменные и вызов функции обновления статистики убраны, так как элементы скрыты в HTML
            })
            .catch(error => {
                console.error('Error fetching score:', error);
                scoreResult.textContent = 'Error fetching score. Please try again.';
            });
    });

    // Удаление слушателя событий и функций связанных со статистикой, так как они не используются
});
  