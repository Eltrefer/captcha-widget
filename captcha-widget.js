(function() {
	// Функция инициализации капчи (теперь её нужно вызывать вручную)
	function initCaptcha() {
			const SERVER_URL = 'https://api.mydomain.com/captcha';
			
			// Создаем элементы для модального окна
			const captchaModal = document.createElement('div');
			captchaModal.style.position = 'fixed';
			captchaModal.style.top = '0';
			captchaModal.style.left = '0';
			captchaModal.style.width = '100%';
			captchaModal.style.height = '100%';
			captchaModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
			captchaModal.style.display = 'flex';
			captchaModal.style.justifyContent = 'center';
			captchaModal.style.alignItems = 'center';
			captchaModal.style.zIndex = '9999';
			
			// Контейнер для капчи
			const captchaContainer = document.createElement('div');
			captchaContainer.style.backgroundColor = '#fff';
			captchaContainer.style.padding = '20px';
			captchaContainer.style.borderRadius = '8px';
			captchaContainer.style.maxWidth = '400px';
			captchaContainer.style.width = '100%';
			
			// Заголовок капчи
			const captchaTitle = document.createElement('h2');
			captchaTitle.textContent = 'Подтвердите, что вы не робот';
			captchaTitle.style.marginTop = '0';
			captchaTitle.style.textAlign = 'center';
			
			// Содержимое капчи
			const captchaContent = document.createElement('div');
			captchaContent.innerHTML = `
					<div style="margin: 20px 0;">
							<p>Пожалуйста, решите капчу:</p>
							<div style="background: #f5f5f5; padding: 15px; text-align: center;">
									Капча будет здесь
							</div>
					</div>
			`;
			
			// Кнопка подтверждения
			const verifyButton = document.createElement('button');
			verifyButton.textContent = 'Подтвердить';
			verifyButton.style.display = 'block';
			verifyButton.style.margin = '20px auto 0';
			verifyButton.style.padding = '10px 20px';
			verifyButton.style.backgroundColor = '#4CAF50';
			verifyButton.style.color = 'white';
			verifyButton.style.border = 'none';
			verifyButton.style.borderRadius = '4px';
			verifyButton.style.cursor = 'pointer';
			
			// Собираем структуру
			captchaContainer.appendChild(captchaTitle);
			captchaContainer.appendChild(captchaContent);
			captchaContainer.appendChild(verifyButton);
			captchaModal.appendChild(captchaContainer);
			document.body.appendChild(captchaModal);
			
			// Генерация ключей
			function generateKeyPair() {
					return {
							publicKey: 'public_key_' + Math.random().toString(36).substr(2, 9),
							privateKey: 'private_key_' + Math.random().toString(36).substr(2, 9)
					};
			}
			
			const keyPair = generateKeyPair();
			
			// Отправка публичного ключа
			console.log('Отправка публичного ключа:', keyPair.publicKey);
			
			// Обработчик кнопки подтверждения
			verifyButton.addEventListener('click', function() {
					console.log('Капча пройдена, приватный ключ:', keyPair.privateKey);
					
					// Генерируем событие о успешном прохождении капчи
					const event = new CustomEvent('captchaVerified', {
							detail: {
									privateKey: keyPair.privateKey
							}
					});
					window.dispatchEvent(event);
					
					// Закрываем модальное окно
					document.body.removeChild(captchaModal);
			});
			
			// Возвращаем функцию для закрытия капчи (на случай, если нужно закрыть программно)
			return {
					close: function() {
							if (document.body.contains(captchaModal)) {
									document.body.removeChild(captchaModal);
							}
					}
			};
	}
	
	// Делаем функцию initCaptcha доступной извне
	window.CaptchaWidget = {
			init: initCaptcha
	};
})();