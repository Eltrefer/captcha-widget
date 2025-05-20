(function() {
  // Создаем модальное окно капчи
  function createCaptchaModal(callback) {
    if (document.getElementById('captcha-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'captcha-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;

    modal.innerHTML = `
      <div style="
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 100%;
        text-align: center;
      ">
        <h2 style="margin-top: 0;">Подтвердите, что вы не робот</h2>
        <div style="margin: 20px 0;">
          <div style="
            background: #f5f5f5;
            padding: 15px;
            margin-bottom: 15px;
          ">
            Введите текст: <input type="text" id="captcha-input" style="padding: 5px;">
          </div>
          <button id="captcha-submit" style="
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">
            Подтвердить
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const privateKey = 'priv_' + Math.random().toString(36).substr(2, 16);
    console.log('Публичный ключ отправлен: pub_' + privateKey.substr(5));

    document.getElementById('captcha-submit').addEventListener('click', function() {
      const input = document.getElementById('captcha-input').value.trim();
      if (!input) {
        alert('Пожалуйста, введите текст!');
        return;
      }
      
      document.body.removeChild(modal);
      if (callback) callback(privateKey);
    });
  }

  // Экспортируем функцию
  window.showCaptcha = createCaptchaModal;

  // Отправляем событие о готовности
  window.dispatchEvent(new CustomEvent('captchaReady'));
})();