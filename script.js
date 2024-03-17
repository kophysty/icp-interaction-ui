document.addEventListener('DOMContentLoaded', function() {
    let totalRequests = 0; // Количество запросов
    const walletInput = document.getElementById('wallet-id');
    const scoreResult = document.getElementById('score');
    const requestCount = document.getElementById('request-count');
    const lastUpdated = document.getElementById('last-updated');
    const statsContainer = document.getElementById('statistics');
    const statsToggleBtn = document.getElementById('statistics-toggle');
  
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
      statsContainer.classList.toggle('active');
      this.textContent = statsContainer.classList.contains('active') ? 'Hide Statistics' : 'Show Statistics';
    });
  
    // Функция обновления статистики
    function updateStatistics() {
      totalRequests++;
      requestCount.textContent = `Total requests: ${totalRequests}`;
      lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
  });
  