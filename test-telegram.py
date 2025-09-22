import requests
import json

BOT_TOKEN = '8295691131:AAEJjGLfXEtbHhTyqJ4RC7JFbpGnx_OHthM'
CHAT_ID = '5312173877'

def send_message(message):
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    data = {
        'chat_id': CHAT_ID,
        'text': message
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        return response.json()
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    message = "🔥💀 TELEGRAM TEST FROM PYTHON! 💀🔥\n\nBot çalışıyor mu test ediyoruz!"
    result = send_message(message)
    
    if result and result.get('ok'):
        print("✅ Mesaj başarıyla gönderildi!")
    else:
        print("❌ Mesaj gönderilemedi!")