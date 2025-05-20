(function() {
  console.log('Captcha widget init started');
  
  window.showCaptcha = function(callback) {
    console.log('Captcha show called');
    
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
      z-index: 99999;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
      ">
        <h2>Подтвердите, что вы не робот</h2>
        <div style="margin: 20px 0;">
          <input type="text" placeholder="Введите текст" 
                 style="padding: 8px; width: 100%; margin-bottom: 10px;">
          <button style="
            padding: 8px 16px;
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
    
    const input = modal.querySelector('input');
    const button = modal.querySelector('button');
    
    button.addEventListener('click', function() {
      if (!input.value.trim()) {
        alert('Введите текст!');
        return;
      }
      
      document.body.removeChild(modal);
      callback('priv_key_' + Math.random().toString(36).substr(2, 10));
    });
  };
  
  console.log('Captcha widget ready');
  window.dispatchEvent(new Event('captchaReady'));
})();