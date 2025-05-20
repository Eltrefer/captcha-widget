// Самовызывающаяся функция для изоляции кода
(function() {
	// Глобальная функция для вызова капчи
	window.showCaptcha = function(callback) {
			// Проверка на повторную инициализацию
			if (document.getElementById('captcha-modal')) return;
			
			// Создаем модальное окно
			const modal = document.createElement('div');
			modal.id = 'captcha-modal';
			modal.style = `
					position: fixed; top: 0; left: 0; 
					width: 100%; height: 100%; 
					background: rgba(0,0,0,0.7); 
					display: flex; justify-content: center; 
					align-items: center; z-index: 9999;
			`;
			
			// Контент капчи
			modal.innerHTML = `
			<div style="
					background: white; padding: 20px; 
					border-radius: 8px; max-width: 400px; 
					width: 100%; text-align: center;
			">
					<h2 style="margin-top: 0;">Подтвердите, что вы не робот</h2>
					<div style="margin: 20px 0;">
							<div style="
									background: #f5f5f5; padding: 15px; 
									margin-bottom: 15px;
							">
									Введите текст: <input type="text" id="captcha-input" style="padding: 5px;">
							</div>
							<button id="captcha-submit" style="
									padding: 10px 20px; background: #4CAF50; 
									color: white; border: none; border-radius: 4px; 
									cursor: pointer;
							">
									Подтвердить
							</button>
					</div>
			</div>
			`;
			
			document.body.appendChild(modal);
			
			// Генерация ключей
			const publicKey = 'pub_' + Math.random().toString(36).substr(2, 10);
			const privateKey = 'priv_' + Math.random().toString(36).substr(2, 16);
			
			console.log('Отправка публичного ключа:', publicKey);
			
			// Обработка подтверждения
			document.getElementById('captcha-submit').addEventListener('click', function() {
					const input = document.getElementById('captcha-input').value.trim();
					if (!input) {
							alert('Пожалуйста, введите текст!');
							return;
					}
					
					// Закрываем модалку
					document.body.removeChild(modal);
					
					// Вызываем callback с приватным ключом
					if (typeof callback === 'function') {
							callback(privateKey);
					}
			});
	};
	
	console.log('Captcha Widget готов к использованию');
})();