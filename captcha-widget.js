(function() {
  'use strict';

  // Проверка повторной загрузки
  if (window.captchaWidgetLoaded) return;
  window.captchaWidgetLoaded = true;
  console.log('[Captcha] Widget initialized');

  /**
   * Основная функция показа капчи
   * @param {function} callback - Функция обратного вызова после успешного прохождения
   */
  function showCaptcha(callback) {
    // Проверка на существующее модальное окно
    if (document.getElementById('captcha-modal')) {
      console.warn('[Captcha] Modal already exists');
      return;
    }

    // Генерация ключей
    const privateKey = generateKey('priv_');
    console.log('[Captcha] Generated private key');

    // Создание модального окна
    const modal = createModal();
    document.body.appendChild(modal);
    console.log('[Captcha] Modal created');

    // Обработка подтверждения
    setupConfirmationHandler(modal, privateKey, callback);
  }

  /** Генерация случайного ключа */
  function generateKey(prefix) {
    return prefix + Math.random().toString(36).substr(2, 16);
  }

  /** Создание DOM-структуры модального окна */
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'captcha-modal';
    modal.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.8);display:flex;
      justify-content:center;align-items:center;z-index:100000;
    `;

    modal.innerHTML = `
      <div style="
        background:#fff;padding:20px;border-radius:8px;
        max-width:400px;width:90%;box-shadow:0 0 20px rgba(0,0,0,0.3);
      ">
        <h2 style="margin-top:0;color:#333;">Подтвердите, что вы не робот</h2>
        <div style="margin:20px 0;">
          <input type="text" placeholder="Введите текст" style="
            padding:10px;width:100%;margin-bottom:15px;
            border:1px solid #ddd;border-radius:4px;font-size:16px;
          ">
          <button style="
            padding:10px 20px;background:#4CAF50;color:#fff;
            border:none;border-radius:4px;cursor:pointer;font-size:16px;width:100%;
          ">
            Подтвердить
          </button>
        </div>
      </div>
    `;

    return modal;
  }

  /** Настройка обработчика подтверждения */
  function setupConfirmationHandler(modal, privateKey, callback) {
    const button = modal.querySelector('button');
    const input = modal.querySelector('input');

    button.addEventListener('click', function() {
      if (!input.value.trim()) {
        console.log('[Captcha] Empty input');
        alert('Пожалуйста, введите текст!');
        return;
      }

      console.log('[Captcha] Verification passed');
      document.body.removeChild(modal);
      
      if (typeof callback === 'function') {
        callback(privateKey);
      }
    });
  }

  // Экспорт функции
  window.showCaptcha = showCaptcha;

  // Событие готовности
  window.dispatchEvent(new CustomEvent('captchaReady'));
  console.log('[Captcha] Ready event dispatched');
})();