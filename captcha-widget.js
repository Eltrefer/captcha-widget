(function() {
  console.log('[Captcha Widget] Script loaded');
  
  // Проверяем, не подключен ли виджет ранее
  if (window.showCaptcha) {
    console.warn('[Captcha Widget] Already loaded!');
    return;
  }

  function showCaptcha(callback) {
    console.log('[Captcha Widget] Show called');
    
    // Проверка на повторное открытие
    if (document.getElementById('captcha-modal')) {
      console.warn('[Captcha Widget] Already shown');
      return;
    }

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.id = 'captcha-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
    `;

    // HTML капчи
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
      ">
        <h2 style="margin-top: 0; color: #333;">Подтвердите, что вы не робот</h2>
        <div style="margin: 20px 0;">
          <input 
            type="text" 
            id="captcha-input" 
            placeholder="Введите текст с картинки" 
            style="
              padding: 10px;
              width: 100%;
              margin-bottom: 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
            "
          >
          <button 
            id="captcha-submit"
            style="
              padding: 10px 20px;
              background: #4CAF50;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              width: 100%;
            "
          >
            Подтвердить
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    console.log('[Captcha Widget] Modal created');

    // Обработчик подтверждения
    document.getElementById('captcha-submit').addEventListener('click', function() {
      const input = document.getElementById('captcha-input');
      if (!input.value.trim()) {
        alert('Пожалуйста, введите текст!');
        return;
      }

      console.log('[Captcha Widget] Captcha verified');
      document.body.removeChild(modal);
      callback('private_key_' + Math.random().toString(36).substr(2, 16));
    });
  }

  // Экспортируем функцию
  window.showCaptcha = showCaptcha;
  console.log('[Captcha Widget] Function registered');

  // Сигнализируем о готовности
  const readyEvent = new Event('captchaReady');
  window.dispatchEvent(readyEvent);
  console.log('[Captcha Widget] Ready event dispatched');
})();